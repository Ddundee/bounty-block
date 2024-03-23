"use client";
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import NavBar from "@/components/ui/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import usdc from '@/../public/usdc.png'





export default function Component() {
  // const router = useRouter();
  const [cards, setCards] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/useBounty');
        const data = await response.json();
        // console.log(await data.)
        setCards(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);


  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <NavBar />
      <main>
        <section className="text-center py-12">
          <h2 className="text-5xl font-bold">Find the perfect bounty</h2>
          <p className="text-lg mt-4">
            Connect with industry leading companies to work on exciting projects and earn tokens.
          </p>
        </section>
        <section className="grid md:grid-cols-2 gap-8 mt-8">
          {cards ? cards.map((card) => (
            <Card className="w-full">
            <CardHeader>
              <CardTitle className="truncate">{card.title}</CardTitle>
              <CardDescription className="flex items-center">
                <p>{card.tokens} USDC</p>
                <div className="ml-2 w-5 h-5">
                  <Image src={usdc} alt={usdc} height={20} width={20}/>
                </div>
                </CardDescription>
              <CardDescription>Company: {card.company}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2">
                {card.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="text-gray-500" />
                <span>Deadline: {new Date().toLocaleDateString()}</span>
              </div>  
              <div className="text-gray-500">Posted 3 minutes ago</div>
            </CardFooter>
            <div className="flex justify-between items-center p-4">
              <Button className="w-full" variant="secondary">
                View Details
              </Button>
              <Button className="w-full">Apply</Button>
            </div>
          </Card>
          )) : "Loading"}
          {/* <Card className="w-full">
            <CardHeader>
              <CardTitle>Add support for mobile devices</CardTitle>
              <CardDescription>1000 tokens</CardDescription>
              <CardDescription>Company: Acme Inc.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                We are looking for developers to add support for mobile devices to our web app. The task involves making
                the UI responsive and optimizing the user experience on mobile devices
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="text-gray-500" />
                <span>Deadline: 2 weeks</span>
              </div>
              <div className="text-gray-500">Posted 3 minutes ago</div>
            </CardFooter>
            <div className="flex justify-between items-center p-4">
              <Button className="w-full" variant="secondary">
                View Details
              </Button>
            </div>
            <div className="flex justify-between items-center p-4">
              <Button className="w-full">Apply</Button>
            </div>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Add support for mobile devices</CardTitle>
              <CardDescription>1000 tokens</CardDescription>
              <CardDescription>Company: Acme Inc.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                We are looking for developers to add support for mobile devices to our web app. The task involves making
                the UI responsive and optimizing the user experience on mobile devices
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="text-gray-500" />
                <span>Deadline: 2 weeks</span>
              </div>
              <div className="text-gray-500">Posted 3 minutes ago</div>
            </CardFooter>
            <div className="flex justify-between items-center p-4">
              <Button className="w-full" variant="secondary">
                View Details
              </Button>
            </div>
            <div className="flex justify-between items-center p-4">
              <Button className="w-full">Apply</Button>
            </div>
          </Card> */}
        </section>
      </main>
    </div>
  )
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}
