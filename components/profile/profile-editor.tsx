import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
export function ProfileEditor() { return <form className="space-y-4"><Input aria-label="Username" defaultValue="midnighthuman" /><Input aria-label="Bio" defaultValue="Here for calm language practice and low-pressure chats." /><div className="flex flex-wrap gap-2">{['music','late-night','english','travel'].map((tag) => <Badge key={tag}>{tag}</Badge>)}</div><Button>Save profile</Button></form>; }
