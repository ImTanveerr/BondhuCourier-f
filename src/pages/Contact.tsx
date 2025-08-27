import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCreateContactMutation } from "@/redux/apis/contact.api";


// Zod schema for validation
const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage({ className }: { className?: string }) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const [createContact, { isLoading }] = useCreateContactMutation();

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await createContact(data).unwrap();
      toast.success("Inquiry submitted successfully!");
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit inquiry");
    }
  };

return (
  <div className={cn("max-w-6xl mx-auto p-6")}>
    <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
      Contact Us
    </h1>

    <div className="flex flex-col md:flex-row gap-8">
      {/* Left: Contact Form */}
      <div className="flex-1">
        <div className="border border-gray-300 dark:border-white/30 rounded-lg p-6 shadow-none bg-transparent">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-white">
            Send Us a Message
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-white">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Name"
                        {...field}
                        className="bg-transparent border border-gray-300 dark:border-white/30 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/50"
                      />
                    </FormControl>
                    <FormMessage className="text-orange-500 dark:text-orange-400" />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your@email.com"
                        type="email"
                        {...field}
                        className="bg-transparent border border-gray-300 dark:border-white/30 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/50"
                      />
                    </FormControl>
                    <FormMessage className="text-orange-500 dark:text-orange-400" />
                  </FormItem>
                )}
              />

              {/* Subject */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-white">Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Subject"
                        {...field}
                        className="bg-transparent border border-gray-300 dark:border-white/30 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/50"
                      />
                    </FormControl>
                    <FormMessage className="text-orange-500 dark:text-orange-400" />
                  </FormItem>
                )}
              />

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-white">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your message..."
                        {...field}
                        className="bg-transparent border border-gray-300 dark:border-white/30 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/50"
                      />
                    </FormControl>
                    <FormMessage className="text-orange-500 dark:text-orange-400" />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Submit Inquiry"}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Right: Contact Info */}
      <div className="flex-1 border border-gray-300 dark:border-white/30 rounded-lg p-6 shadow-none bg-transparent">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Our Contact Info
        </h2>
        <div className="space-y-4 text-gray-900 dark:text-white">
          <div>
            <h3 className="font-medium">Address</h3>
            <p>123 Bondhu Currier Street, Dhaka, Bangladesh</p>
          </div>
          <div>
            <h3 className="font-medium">Phone</h3>
            <p>+880 1234 567890</p>
          </div>
          <div>
            <h3 className="font-medium">Email</h3>
            <p>info@bondhucurrier.com</p>
          </div>
          <div>
            <h3 className="font-medium">Working Hours</h3>
            <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);



}
