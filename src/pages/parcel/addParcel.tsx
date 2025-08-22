"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useAddParcelMutation } from "@/redux/apis/sender.api";

// ParcelType enum matches backend
const parcelTypes = ["DOCUMENT", "BOX", "FRAGILE", "OTHER"] as const;

const formSchema = z.object({
  receiverId: z.string().min(1, "Receiver ID is required"),
  pickupAddress: z.string().min(1, "Pickup address is required"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  weight: z
    .number()
    .positive("Weight must be greater than 0"),
  parcelType: z.enum(parcelTypes, { message: "Select a valid parcel type" }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateParcel() {
  const [addParcel] = useAddParcelMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiverId: "",
      pickupAddress: "",
      deliveryAddress: "",
      contactNumber: "",
      weight: 1,
      parcelType: "DOCUMENT",
      description: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("Creating parcel...");

    try {
      const res = await addParcel(data).unwrap();
      if (res.success) {
        toast.success("Parcel created successfully", { id: toastId });
        form.reset();
      } else {
        toast.error("Failed to create parcel", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-16 px-5">
      <Card>
        <CardHeader>
          <CardTitle>Create New Parcel</CardTitle>
          <CardDescription>Fill in parcel details</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="create-parcel-form"
              className="space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="receiverId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receiver ID</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Receiver's user ID" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pickupAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Pickup location" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Delivery location" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Receiver's phone number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} min={0.1} step={0.1} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parcelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parcel Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {parcelTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Any notes" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" form="create-parcel-form">
            Create Parcel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}