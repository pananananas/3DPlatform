import AsciiModel from "~/components/3D/ascii-model";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="pt-10 lg:px-16 xl:px-32">
      <div className="container mx-auto h-fit flex-row items-center justify-center px-4 py-32">
        <h1 className="mb-6 text-center text-[50px] font-bold leading-none md:text-[70px]">
          TattooAI
        </h1>
        <h2 className="mb-6 text-center text-[18px] font-bold leading-none sm:text-[20px] md:text-[30px]">
          Display Tattoo Designs on 3D Models
        </h2>
        <div className="flex items-center justify-center gap-4">
          <Link href={`/tattoo`} className="">
            <Button className="items-center justify-center" variant="outline">
              Tattoo Preview
            </Button>
          </Link>
          <Link href={`/models`} className="">
            <Button className="items-center justify-center">3D Models</Button>
          </Link>
        </div>
        <AsciiModel />
      </div>
    </div>
  );
}
