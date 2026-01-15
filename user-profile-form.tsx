'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/lib/types';
import { Stethoscope, User as UserIcon, Phone } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  skills: z.enum(['none', 'basic', 'nurse', 'doctor']),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

type UserProfileFormProps = {
  user: User;
};

export default function UserProfileForm({ user }: UserProfileFormProps) {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone,
      skills: user.skills,
    },
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'Profile Updated',
      description: 'Your information has been saved successfully.',
    });
    console.log(data);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">My Profile</CardTitle>
        <CardDescription>View and update your personal information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                   <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="pl-9" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                   <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="555-123-4567" {...field} className="pl-9" />
                    </FormControl>
                   </div>
                  <FormMessage />
                </FormItem>
              )}
            />
             {user.role === 'volunteer' && (
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                     <div className="relative">
                      <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="pl-9">
                            <SelectValue placeholder="Select your qualification" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">No medical training</SelectItem>
                          <SelectItem value="basic">Basic First Aid</SelectItem>
                          <SelectItem value="nurse">Nurse</SelectItem>
                          <SelectItem value="doctor">Doctor</SelectItem>
                        </SelectContent>
                      </Select>
                     </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
