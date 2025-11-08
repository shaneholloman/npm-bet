import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Main } from "@/components/main";
import { Skeleton } from "@/components/ui/skeleton";

type PageProps = {
  params: Promise<{
    package: string;
  }>;
};

const Home = async ({ params }: PageProps) => {
  const { package: packageName } = await params;

  return (
    <div className="grid h-screen grid-rows-[2rem_1fr_2rem] gap-4 overflow-hidden p-4">
      <Header />
      <Suspense fallback={<Skeleton className="size-full" />}>
        <Main packageName={packageName} />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Home;
