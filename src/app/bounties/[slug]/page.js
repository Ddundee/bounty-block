"use client";
import { Button } from "@/components/ui/button"
import NavBar from "@/components/ui/navbar"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home({ params }) {
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/bounties/' + params.slug);
        const dat = await response.json();
        console.log(await dat.bounty);
        setData(dat.bounty);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
        setFile(null);
      } else {
        alert("Error uploading file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <NavBar />
      {data ? <div>
        <div className="w-full h-10"/>
      <div className="bg-white">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="text-sm text-gray-500">Company: {data.company}</p>
      <div className="mt-4">
        <p className="mb-2 text-lg">Description</p>
        <p className="text-gray-700">
          {data.description}
        </p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Token Reward</p>
          <p>{data.tokens}</p>
        </div>
        <div>
          <p className="font-semibold">Equity</p>
          <p>{data.equity}%</p>
        </div>
        <div>
          <p className="font-semibold">Email</p>
          <a className="text-blue-500" href={`mailto:${data.email}`}>
          {data.email}
          </a>
        </div>
        <div>
          <p className="font-semibold">Deadline</p>
          <p>{data.deadline}</p>
        </div>

        {data.link ? <div>
          <p className="font-semibold">Link</p>
          <a className="text-blue-500 block" href={data.link}>
            {data.link}
          </a>
        </div> : ""}
        <div>
          <p className="font-semibold">Upload Date</p>
          <p>{data.uploadDate}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Express Your Interest</h2>
        <form onSubmit={handleSubmit}>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              <p className="mb-2">Click the button below to upload your application for this bounty.</p>
              <input type="file" onChange={handleFileChange} />
            </div>
            <Button type="submit" className="w-full mt-4">
              Upload &uarr;
            </Button>
          </form>
      </div>
    </div>
      </div> : "Loading"}
    </div>
  )
}