"use client";

import CustomCheckbox from "@/components/forms/elements/CustomCheckbox";
import CustomFileInput from "@/components/forms/elements/CustomFileInput";
import CustomInput from "@/components/forms/elements/CustomInput";
import MultipleSelector from "@/components/forms/elements/MultipleSelector";
import CustomRadioGroup from "@/components/forms/elements/CustomRadioGroup";
import CustomSelect from "@/components/forms/elements/CustomSelect";
import CustomSwitch from "@/components/forms/elements/CustomSwitch";
import CustomTextArea from "@/components/forms/elements/CustomTextArea";
import { useState } from "react";

const frameworks = ["React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt.js", "Gatsby", "Remix"];

const users = [
  { value: "john", label: "John Doe" },
  { value: "jane", label: "Jane Smith" },
  { value: "bob", label: "Bob Johnson", disabled: true },
  { value: "alice", label: "Alice Brown" },
];
const skills = ["JavaScript", "TypeScript", "Python", "Go", "Rust"];


export default function Home() {
  const [switchValue, setSwitchValue] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [error, setError] = useState("");


  const handleFrameworkChange = (values: string[]) => {
    setSelectedFrameworks(values);
    if (values.length === 0) {
      setError("Please select at least one framework");
    } else {
      setError("");
    }
  };

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
  ];

  const notificationOptions = [
    {
      value: "email",
      label: "Email notifications",
      description: "Receive notifications via email",
    },
    {
      value: "sms",
      label: "SMS notifications",
      description: "Receive notifications via text message",
    },
    {
      value: "push",
      label: "Push notifications",
      description: "Receive notifications in your browser",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Custom Form Components</h1>
        <p className="text-muted-foreground">Built with shadcn/ui components</p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Input Components</h2>
          <div className="space-y-4">
            <CustomInput
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              hint="We'll never share your email with anyone"
              showHint={true}
              required
            />

            <CustomInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              hint="Password must be at least 8 characters"
              showHint={true}
              required
            />

            <CustomInput
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              error="Please enter a valid phone number"
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Select & TextArea</h2>
          <div className="space-y-4">
            <CustomSelect
              label="Country"
              options={countryOptions}
              placeholder="Select your country"
              hint="Choose your country of residence"
              showHint={true}
              value={selectValue}
              onValueChange={setSelectValue}
              required
            />

            <CustomTextArea
              label="Message"
              placeholder="Enter your message here..."
              hint="Maximum 500 characters"
              showHint={true}
              rows={4}
              maxLength={500}
              required
            />

            <CustomTextArea label="Bio" placeholder="Tell us about yourself" resize={false} rows={3} />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Choice Components</h2>
          <div className="space-y-4">
            <CustomCheckbox
              label="I agree to the terms and conditions"
              description="By checking this box, you agree to our terms of service and privacy policy"
              required
            />

            <CustomCheckbox
              label="Subscribe to newsletter"
              description="Get the latest updates and news delivered to your inbox"
              hint="You can unsubscribe at any time"
              showHint
            />

            <CustomRadioGroup
              label="Notification Preferences"
              options={notificationOptions}
              value={radioValue}
              onValueChange={setRadioValue}
              hint="Choose how you'd like to receive notifications"
              showHint={true}
            />

            <CustomRadioGroup
              label="Payment Method"
              options={[
                { value: "card", label: "Credit Card" },
                { value: "paypal", label: "PayPal" },
                { value: "bank", label: "Bank Transfer" },
              ]}
              orientation="horizontal"
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Advanced Components</h2>
          <div className="space-y-4">
            <CustomSwitch
              label="Enable notifications"
              description="Receive push notifications for important updates"
              checked={switchValue}
              onCheckedChange={setSwitchValue}
              hint="You can change this setting anytime"
              showHint={true}
            />

            <CustomSwitch label="Dark mode" description="Switch to dark theme" />

            <CustomFileInput
              label="Profile Picture"
              accept="image/*"
              hint="Upload a profile picture (max 5MB)"
              showHint={true}
              maxSize={5}
              allowedTypes={["PNG", "JPG", "JPEG", "GIF"]}
            />

            <CustomFileInput
              label="Documents"
              multiple
              accept=".pdf,.doc,.docx"
              hint="Upload multiple documents"
              showHint={true}
              allowedTypes={["PDF", "DOC", "DOCX"]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Multi-Select Component</h2>
          <div className="space-y-6">
            {/* String array usage - string used as both label and value */}
            <MultipleSelector
              label="Favorite Frameworks"
              placeholder="Select frameworks..."
              options={frameworks}
              onValueChange={handleFrameworkChange}
              required
              error={error}
              hint="Choose your preferred frontend frameworks"
              creatable
              maxSelected={3}
            />

            {/* Object array usage */}
            <MultipleSelector
              label="Team Members"
              placeholder="Select team members..."
              options={users}
              onValueChange={setSelectedUsers}
              hint="Select users for your project team"
              emptyText="No users found"
              searchable
              maxSelected={2}
            />

            {/* String array with max selection - user can still search after max reached */}
            <MultipleSelector
              label="Programming Skills (Max 3)"
              placeholder="Select your skills..."
              options={skills}
              onValueChange={setSelectedSkills}
              hint="You can still search and remove items after reaching the maximum"
              maxSelected={3}
              onMaxSelected={(max) => console.log(`Maximum ${max} skills selected`)}
            />

            {/* Disabled state */}
            <MultipleSelector
              label="Disabled Field"
              placeholder="This field is disabled"
              options={frameworks}
              disabled
              hint="This field cannot be edited"
            />

            {/* With default values and fixed options */}
            <MultipleSelector
              label="Pre-selected Options"
              placeholder="Add more options..."
              options={frameworks}
              defaultOptions={[
                { value: "React", label: "React", fixed: true },
                { value: "Next.js", label: "Next.js" },
              ]}
              hint="React is fixed and cannot be removed"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
