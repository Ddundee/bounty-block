"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
import NavBar from "@/components/ui/navbar";

export default function Component() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [deadline, setDeadline] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const slug = {
      title,
      company,
      description,
      reward,
      deadline,
      email,
      link,
    };
    console.log(``)
    
      try {
        const response = await fetch(`/api/newBounty/${title}/${company}/${description}/${reward}/${deadline}/${email}/${link}`);
        const data = await response.json();
        // console.log(await data.)
        setCards(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    
    router.push("/new-bounty/submitted")
    // Reset form fields after submission
    // setTitle("");
    // setCompany("");
    // setDescription("");
    // setReward("");
    // setDeadline("");
    // setEmail("");
    // setLink("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
       <NavBar/>
       <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Submit a New Bounty</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <label className="block">
          <span className="text-gray-700">Bounty Title<span className="font-black">*</span></span>
          <Input
            placeholder="Enter the bounty title"
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Company Name<span className="font-black">*</span></span>
          <Input
            placeholder="Enter your company name"
            type="text"
            value={company}
            required
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Bounty Description<span className="font-black">*</span></span>
          <Textarea
            placeholder="Describe the bounty details"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Reward Amount<span className="font-black">*</span></span>
          <Input
            placeholder="Number of tokens being offered"
            type="number"
            value={reward}
            required
            onChange={(e) => setReward(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Deadline<span className="font-black">*</span></span>
          <Input
            type="date"
            value={deadline}
            required
            onChange={(e) => setDeadline(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Contact Email<span className="font-black">*</span></span>
          <Input
            placeholder="Enter contact email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Link to More Info</span>
          <Input
            placeholder="Enter URL with more info"
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </label>
        <Button className="w-full" type="submit">
          Submit Bounty
        </Button>
      </form>
    </div>
    </div>
    
  );
}