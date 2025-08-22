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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ParcelType, IParcel } from "@/types/parcel.types";
import { useAddParcelMutation } from "@/redux/apis/sender.api";

const parcelSchema = z.object({
  receiverId: z.string().min(1, "Receiver ID is required"),
  pickupAddress: z.string().min(1, "Pickup address is required"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  weight: z.number().min(0.1, "Weight must be greater than 0"),
  parcelType: z.enum(Object.values(ParcelType)),
  description: z.string().optional(),
});

type ParcelFormValues = z.infer<typeof parcelSchema>;

interface Props {
  senderId: string;
  className?: string;
}

export default function CreateParcelForm({ senderId, className }: Props) {
  const [createParcel, { isLoading }] = useAddParcelMutation();

  const form = useForm<ParcelFormValues>({
    resolver: zodResolver(parcelSchema),
    defaultValues: {
      receiverId: "",
      pickupAddress: "",
      deliveryAddress: "",
      contactNumber: "01874968514",
      weight: 0,
      parcelType: ParcelType.DOCUMENT,
      description: "tumi valo ami valo baki sovai kalo",
    },
  });

  const onSubmit = async (data: ParcelFormValues) => {
    try {
      await createParcel({ ...data, senderId }).unwrap();
      toast.success("Parcel created successfully");
      form.reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create parcel");
      console.error(error);
    }
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto mt-16 px-5", className)}>
      <h2 className="text-2xl font-bold mb-4 text-center">Create Parcel</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* Receiver ID */}
          <FormField
            control={form.control}
            name="receiverId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receiver ID</FormLabel>
                <FormControl>
                  <Input placeholder="Receiver ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pickup Address */}
          <FormField
            control={form.control}
            name="pickupAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Address</FormLabel>
                <FormControl>
                  <Input placeholder="Pickup Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Delivery Address */}
          <FormField
            control={form.control}
            name="deliveryAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Address</FormLabel>
                <FormControl>
                  <Input placeholder="Delivery Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Number */}
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="Contact Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Weight */}
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Weight"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Parcel Type */}
          <FormField
            control={form.control}
            name="parcelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parcel Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Parcel Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Parcel Types</SelectLabel>
                        {Object.values(ParcelType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Parcel"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
