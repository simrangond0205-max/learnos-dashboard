import { Sidebar } from "@/components/Sidebar";
import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Globe, ChevronRight } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

interface SettingRowProps {
  label: string;
  description: string;
  value?: string;
  toggle?: boolean;
  defaultChecked?: boolean;
}

function SettingRow({ label, description, value, toggle, defaultChecked }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      {toggle ? (
        <div
          className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors ${defaultChecked ? "bg-primary" : "bg-white/10"}`}
        >
          <div
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${defaultChecked ? "translate-x-5" : "translate-x-0.5"}`}
          />
        </div>
      ) : value ? (
        <span className="text-xs text-muted-foreground bg-white/5 border border-white/10 px-3 py-1 rounded-full">
          {value}
        </span>
      ) : (
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      )}
    </div>
  );
}

interface SettingSectionProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}

function SettingSection({ icon: Icon, title, children }: SettingSectionProps) {
  return (
    <motion.section
      className="rounded-3xl border border-card-border bg-card p-6"
      variants={item}
      whileHover={{ scale: 1.005 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-semibold text-sm tracking-wide uppercase text-muted-foreground">{title}</h3>
      </div>
      <div>{children}</div>
    </motion.section>
  );
}

export default function Settings() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />

      <main className="flex-1 md:ml-20 lg:ml-64 p-4 md:p-8 lg:p-10 pb-24 md:pb-10">
        <header className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage your account and preferences</p>
        </header>

        <motion.div
          className="max-w-2xl space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <SettingSection icon={User} title="Profile">
            <SettingRow label="Display Name" description="Shown across the dashboard" value="Alex Chen" />
            <SettingRow label="Email" description="Your account email address" value="alex@learnos.app" />
            <SettingRow label="Change Password" description="Update your login credentials" />
          </SettingSection>

          <SettingSection icon={Bell} title="Notifications">
            <SettingRow label="Daily Reminders" description="Get nudged to keep your streak alive" toggle defaultChecked />
            <SettingRow label="Course Updates" description="Alerts when new content is added" toggle defaultChecked />
            <SettingRow label="Weekly Summary" description="Email digest of your progress" toggle />
          </SettingSection>

          <SettingSection icon={Palette} title="Appearance">
            <SettingRow label="Theme" description="Dark mode is always on" value="Dark" />
            <SettingRow label="Accent Color" description="Primary interface color" value="Indigo" />
            <SettingRow label="Reduced Motion" description="Minimize animations" toggle />
          </SettingSection>

          <SettingSection icon={Globe} title="Language & Region">
            <SettingRow label="Language" description="Interface language" value="English" />
            <SettingRow label="Timezone" description="Used for activity tracking" value="UTC−8" />
          </SettingSection>

          <SettingSection icon={Shield} title="Privacy & Security">
            <SettingRow label="Two-Factor Auth" description="Extra layer of account security" toggle />
            <SettingRow label="Activity Visibility" description="Who can see your learning activity" value="Private" />
            <SettingRow label="Delete Account" description="Permanently remove all your data" />
          </SettingSection>
        </motion.div>
      </main>
    </div>
  );
}
