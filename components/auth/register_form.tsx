"use client"
import { CardWrapper } from "@/components/auth/CardWrapper";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form ,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form";
import * as z from "zod";
import {RegisterSchema} from "@/schemas"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";
export function Register_form(){
    const [isPending,startTransition] = useTransition();
    const [error,setError] = useState<string|undefined>("");
    const [success,setSuccess] = useState<string|undefined>("");
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver:zodResolver(RegisterSchema),
        defaultValues:{
            name:"",
            email:"",
            password:""
        }
    });

    const onSubmit = (values:z.infer<typeof RegisterSchema>)=>{
        startTransition(()=>{
            register(values).then((data)=>{
                    setError(data.error)
                    setSuccess(data.success)
            })
        })
    }

    return <CardWrapper herderLable="Create an account" backButtonLable="Already have an account ?" backButtonHref="/auth/login"
    showSocial>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                <FormField control={form.control} name="name" render={({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                            <Input {...field} disabled={isPending} placeholder="Enter Your name"></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="email" render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                            <Input {...field} disabled={isPending} placeholder="email@example.com"></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}/>

                    <FormField control={form.control} name="password" render={({field})=>(
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                            <Input {...field} disabled={isPending} placeholder="Enter your password"></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}/>
                </div>
                    
                <FormError message={error}/>
                <FormSuccess message={success}/>
                    <Button type="submit" disabled={isPending} className="w-full">
                        Sign Up
                    </Button>
            </form>
        </Form>
    </CardWrapper>
}