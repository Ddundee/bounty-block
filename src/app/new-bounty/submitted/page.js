"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'

export default function Component() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <h1>New Bounty Created!</h1>
    </div>
  );
}