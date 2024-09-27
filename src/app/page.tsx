import AsciiModel from "~/components/3D/ascii-model";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="pt-10 lg:px-16 xl:px-32">
      <div className="container mx-auto h-fit flex-row items-center justify-center px-4 py-32">
        <h1 className="mb-6 text-center text-[50px] font-bold leading-none md:text-[70px]">
          3D Platform
        </h1>
        <h2 className="mb-6 text-center text-[18px] font-bold leading-none sm:text-[20px] md:text-[30px]">
          Discover 3D models created with AI
        </h2>
        <div className="flex items-center justify-center">
          {/* <Button variant="secondary" className="mr-4"></Button> */}
          <Link href={`/models`} className="">
            <Button className="items-center justify-center">3D Models</Button>
          </Link>
        </div>
        <AsciiModel />
      </div>
    </div>
  );
}
