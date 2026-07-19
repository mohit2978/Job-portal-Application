import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Bell, Lock, AlertTriangle, ShieldCheck } from "lucide-react"
import { toast } from "sonner"

export default function Settings() {
  const handleSave = () => {
    toast.success("Settings saved successfully!")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">
          Configure your employer account preferences and notifications
        </p>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="new-app-alerts">New Application Alerts</Label>
                <p className="text-sm text-slate-600">Get notified when a candidate applies to your jobs</p>
              </div>
              <Switch id="new-app-alerts" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="message-alerts">Message Alerts</Label>
                <p className="text-sm text-slate-600">Get notified when a candidate sends you a message</p>
              </div>
              <Switch id="message-alerts" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weekly-reports">Weekly Job Reports</Label>
                <p className="text-sm text-slate-600">Receive a weekly summary of your job performances</p>
              </div>
              <Switch id="weekly-reports" />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Visibility */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Privacy & Visibility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="public-profile">Public Company Profile</Label>
                <p className="text-sm text-slate-600">Allow candidates to discover your company profile in the directory</p>
              </div>
              <Switch id="public-profile" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-recruiter">Show Recruiter Name</Label>
                <p className="text-sm text-slate-600">Display your name as the hiring manager on job postings</p>
              </div>
              <Switch id="show-recruiter" />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-100 bg-red-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <Label className="text-red-600 font-semibold">Deactivate Account</Label>
                <p className="text-sm text-slate-600">Temporarily disable your employer account and hide all active jobs.</p>
              </div>
              <Button variant="destructive">Deactivate</Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end pb-10">
          <Button onClick={handleSave} size="lg">Save Changes</Button>
        </div>
      </div>
    </div>
  )
}
