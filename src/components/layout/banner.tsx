import Image from "next/image";

export default function Banner({ imageUrl, title , subtitle}: { imageUrl: string; title: string; subtitle: string }) {
  return (
    <section className="relative w-full min-h-[400px] flex justify-center items-center align-middle">
      <Image
        src={imageUrl}
        className="absolute top-0 left-0 w-full h-full object-cover"
        alt = "banner"
        width={1920}
        height={544}
      />
      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center flex-col pt-[40px] md:pt-[180px] px-0 md:px-[10px]">
        <h1 className="text-white text-center font-roboto text-[32px] md:text-[60px] not-italic font-bold leading-[120%]">
          {title}
        </h1>
        <div className="text-white text-center font-roboto text-[14px] md:text-[20px] font-normal leading-normal">
          {subtitle}
        </div>
      </div>
    </section>
  );
}
