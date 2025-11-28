'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from '@/components/auth/protected-route';
import { 
  Settings, 
  Shield, 
  Database, 
  Mail, 
  Bell,
  Palette,
  Globe,
  Lock,
  Save,
  RefreshCw
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "MaizeAI",
    siteDescription: "AI-powered maize disease detection system",
    maintenanceMode: false,
    allowRegistration: true,
    emailNotifications: true,
    autoBackup: true,
    backupFrequency: "daily",
    theme: "light",
    language: "en"
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleBackup = async () => {
    // Simulate backup process
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="container py-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
            <p className="text-muted-foreground">
              Configure system preferences and application settings
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link href="/admin">
                <Shield className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Input
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Temporarily disable the application
                  </p>
                </div>
                <Badge className={settings.maintenanceMode ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                  {settings.maintenanceMode ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow Registration</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable new user registration
                  </p>
                </div>
                <Badge className={settings.allowRegistration ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                  {settings.allowRegistration ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send email alerts for important events
                  </p>
                </div>
                <Badge className={settings.emailNotifications ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                  {settings.emailNotifications ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="space-y-2">
                <Label>Notification Types</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="newUser" defaultChecked />
                    <Label htmlFor="newUser" className="text-sm">New user registration</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="systemAlert" defaultChecked />
                    <Label htmlFor="systemAlert" className="text-sm">System alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="securityAlert" defaultChecked />
                    <Label htmlFor="securityAlert" className="text-sm">Security alerts</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Backup Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Backup Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto Backup</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically backup system data
                  </p>
                </div>
                <Badge className={settings.autoBackup ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                  {settings.autoBackup ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="space-y-2">
                <Label>Backup Frequency</Label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={settings.backupFrequency}
                  onChange={(e) => setSettings({...settings, backupFrequency: e.target.value})}
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <Button variant="outline" onClick={handleBackup} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Backup Now
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Session Timeout (minutes)</Label>
                <Input type="number" defaultValue="30" />
                <p className="text-sm text-muted-foreground">
                  Automatically log out users after inactivity
                </p>
              </div>
              <div className="space-y-2">
                <Label>Password Requirements</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="minLength" defaultChecked />
                    <Label htmlFor="minLength" className="text-sm">Minimum 8 characters</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="uppercase" defaultChecked />
                    <Label htmlFor="uppercase" className="text-sm">Include uppercase letter</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="numbers" defaultChecked />
                    <Label htmlFor="numbers" className="text-sm">Include numbers</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="mr-2 h-5 w-5" />
                Appearance Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={settings.theme}
                  onChange={(e) => setSettings({...settings, theme: e.target.value})}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Language</Label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={settings.language}
                  onChange={(e) => setSettings({...settings, language: e.target.value})}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="sw">Swahili</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
