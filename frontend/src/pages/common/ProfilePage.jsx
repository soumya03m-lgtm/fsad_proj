import { useEffect, useState } from 'react';
import { Save, UserCircle2 } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import SectionCard from '../../components/ui/SectionCard';
import { userService } from '../../services/userService';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [saving, setSaving] = useState(false);
  const { pushToast } = useToast();
  const { updateUser } = useAuth();

  useEffect(() => {
    userService
      .me()
      .then((data) => {
        setProfile(data);
        setName(data?.name || '');
        setDepartmentId(data?.departmentId || '');
      })
      .catch(() => {
        setProfile(null);
      });
  }, []);

  const onSave = async () => {
    setSaving(true);
    try {
      const updated = await userService.updateMe({ name, departmentId: departmentId || null });
      setProfile(updated);
      updateUser({ name: updated.name });
      pushToast('Profile updated', 'success');
    } catch (error) {
      pushToast(error.response?.data?.error?.message || 'Could not update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">Account</p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">Profile Settings</h1>
        <p className="max-w-2xl text-sm text-[var(--text-muted)]">Manage your account identity and role-linked profile details.</p>
      </header>

      <SectionCard title="Personal Information" subtitle="This profile is shared across your dashboard sessions">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Full Name</span>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Email</span>
            <Input value={profile?.email || ''} disabled />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Role</span>
            <Input value={profile?.role || ''} disabled />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Department ID (optional)</span>
            <Input value={departmentId || ''} onChange={(e) => setDepartmentId(e.target.value)} placeholder="Department reference" />
          </label>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Button type="button" onClick={onSave} disabled={saving}>
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Profile'}
          </Button>
          <p className="inline-flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <UserCircle2 className="h-4 w-4" />
            Keep your profile updated for clearer team visibility.
          </p>
        </div>
      </SectionCard>
    </div>
  );
}
