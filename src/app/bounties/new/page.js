"use client";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
import NavBar from "@/components/ui/navbar";
import { useWeb3Context } from "@/util/context/Web3Context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { Input } from "@/components/ui/input"
// import Web3Connection from "./web3connection";
import { FaEthereum } from "react-icons/fa";

import MyToken from "./artifacts/contracts/MyToken.sol/MyToken.json";

const myTokenAddress = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

export default function Component() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [deadline, setDeadline] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  


  const handleSubmit2 = (e) => {
    e.preventDefault();
    console.log("Search term:", searchTerm);
    // Add your search logic here
    router.push('/bounties/?query=' + searchTerm)
  };
  
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address, currentChain, provider },
  } = useWeb3Context();

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
        //mint tokens
        const amountToMint = ethers.parseEther(reward);
        await contractInstance.mint(owner.address, amountToMint);

        const response = await fetch(`/api/newBounty/${title}/${company}/${description}/${reward}/${deadline}/${email}/${link}`);
        const data = await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    router.push("/")
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
       <header className="flex justify-between items-center py-6">
      <Link href="/"><h1 className="text-3xl font-bold">BountyBlock</h1></Link>
      <div className="flex space-x-4">
        <form onSubmit={handleSubmit2}>
          {/* <Input
            className="block w-full"
            placeholder="Search for Bounties"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /> */}
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">View Bounties &darr;</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Bounty Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View All Bounties</DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/bounties/new">Create Bounty</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div>
            {!isAuthenticated ? (
              <Button
                onClick={connectWallet}

              >
                {/* <Icon as={FaEthereum} /> */}
                <FaEthereum className="mr-2"/>Connect Wallet
              </Button>
            ) : (
                
              <div
                
              >
                <Button
                onClick={disconnect}
                variant="outline"
                >
                    <FaEthereum className="mr-2"/>Disconnect
                </Button>
              </div>
              )}
        </div>
        
      </div>
    </header>
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