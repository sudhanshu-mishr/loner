'use client';
import { useCallback, useRef, useState } from 'react';
import type { Socket } from 'socket.io-client';

export function useWebRTC(socket: Socket | null, sessionId?: string) {
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const createPeer = useCallback(() => {
    const pc = new RTCPeerConnection({ iceServers: [{ urls: process.env.NEXT_PUBLIC_STUN_URL ?? 'stun:stun.l.google.com:19302' }] });
    pc.onicecandidate = (event) => event.candidate && socket?.emit('call:ice-candidate', { sessionId, candidate: event.candidate });
    pc.ontrack = (event) => setRemoteStream(event.streams[0]);
    pcRef.current = pc;
    return pc;
  }, [sessionId, socket]);

  const startLocalPreview = useCallback(async (audioOnly = false) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: audioOnly ? false : { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' }, audio: { echoCancellation: true, noiseSuppression: true } });
      localStreamRef.current = stream; setLocalStream(stream); return stream;
    } catch (error) { setPermissionError(error instanceof Error ? error.message : 'Camera or microphone permission was denied.'); return null; }
  }, []);

  const startCall = useCallback(async (initiator: boolean) => {
    const stream = localStreamRef.current ?? await startLocalPreview(); if (!stream) return;
    const pc = pcRef.current ?? createPeer(); stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    if (initiator) { const offer = await pc.createOffer(); await pc.setLocalDescription(offer); socket?.emit('call:offer', { sessionId, offer }); }
  }, [createPeer, sessionId, socket, startLocalPreview]);

  const acceptOffer = useCallback(async (offer: RTCSessionDescriptionInit) => {
    const stream = localStreamRef.current ?? await startLocalPreview(); if (!stream) return;
    const pc = pcRef.current ?? createPeer(); stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    await pc.setRemoteDescription(offer); const answer = await pc.createAnswer(); await pc.setLocalDescription(answer); socket?.emit('call:answer', { sessionId, answer });
  }, [createPeer, sessionId, socket, startLocalPreview]);

  const acceptAnswer = useCallback((answer: RTCSessionDescriptionInit) => pcRef.current?.setRemoteDescription(answer), []);
  const addIceCandidate = useCallback((candidate: RTCIceCandidateInit) => pcRef.current?.addIceCandidate(candidate), []);
  const toggleMic = useCallback(() => localStreamRef.current?.getAudioTracks().forEach((t) => { t.enabled = !t.enabled; }), []);
  const toggleCamera = useCallback(() => localStreamRef.current?.getVideoTracks().forEach((t) => { t.enabled = !t.enabled; }), []);
  const cleanup = useCallback(() => { pcRef.current?.close(); pcRef.current = null; localStreamRef.current?.getTracks().forEach((t) => t.stop()); localStreamRef.current = null; setLocalStream(null); setRemoteStream(null); }, []);
  return { localStream, remoteStream, permissionError, startLocalPreview, startCall, acceptOffer, acceptAnswer, addIceCandidate, toggleMic, toggleCamera, cleanup };
}
