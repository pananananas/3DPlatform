import { Link } from "next-view-transitions";
import AsciiModel from "~/components/ascii-model";
import { Button } from "~/components/ui/button";
// import { ModelsGallery } from "~/components/models-gallery";
// import { getModels3d } from "~/server/queries";

export default async function HomePage() {
  // const models3d = await getModels3d();

  return (
    <div className="lg:px-16 xl:px-32 pt-10">
      <div className="container mx-auto h-fit flex-row items-center justify-center px-4 py-32">
        <h1 className="mb-6 text-center text-[50px] font-bold leading-none md:text-[70px]">
          3D Platform
        </h1>
        <h2 className="mb-6 text-center text-[18px] font-bold leading-none sm:text-[20px] md:text-[30px]">
          Discover 3D models generated with AI
        </h2>
        <div className="flex items-center justify-center">
          {/* <Button variant="secondary" className="mr-4">
          </Button> */}
          <Link href={`/models`} className="">
          <Button className="items-center justify-center">3D Models</Button>
          </Link>
        </div>
        <AsciiModel />
      </div>
    </div>
  );
}
