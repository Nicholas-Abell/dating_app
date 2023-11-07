import { LocationValidation } from "@/libs/validations/User";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";
import { useForm } from "react-hook-form";

type AccountLocationProps = {
  city?: string;
};

const AccountLocation: React.FC<AccountLocationProps> = async ({ city }) => {
  const form = useForm({
    resolver: zodResolver(LocationValidation),
  });

  const onSubmit = async (values: z.infer<typeof LocationValidation>) => {};

  return <form></form>;
};
export default AccountLocation;
