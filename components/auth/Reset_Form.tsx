"use client"
import { CardWrapper } from "@/components/auth/CardWrapper";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form ,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form";
import * as z from "zod";
import {ResetSchema} from "@/schemas"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState, useTransition } from "react";
import { ResetPassword } from "@/actions/reset_password";
export function ResetForm(){

    const [isPending,startTransition] = useTransition();
    const [error,setError] = useState<string|undefined>("");
    const [success,setSuccess] = useState<string|undefined>("");
    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver:zodResolver(ResetSchema),
        defaultValues:{
            email:""
        }
    });

    const onSubmit = (values:z.infer<typeof ResetSchema>)=>{
        startTransition(()=>{
            ResetPassword(values).then((data)=>{
                    setError(data?.error)
                    setSuccess(data?.success)
            })
        })
    }

    return <CardWrapper herderLable="Reset Password" backButtonLable="Back To Login" backButtonHref="/auth/login">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField control={form.control} name="email" render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                            <Input {...field} disabled={isPending} placeholder="email@example.com"></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}/>
                </div>
                <FormError message={error}/>
                <FormSuccess message={success}/>
                    <Button type="submit" disabled={isPending} className="w-full">
                        Reset Password
                    </Button>
            </form>
        </Form>
    </CardWrapper>
}