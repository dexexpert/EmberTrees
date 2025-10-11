'use client'
import Image from "next/image";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition
} from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'

const testimonials = [
  {
    text: "I’ve ordered from Ember Trees several times now, and every experience has been excellent. The website is super easy to navigate, checkout is smooth, and I love how I can track my delivery in real time. The products always arrive fresh, neatly packaged, and exactly as described — no surprises. Their drivers are professional and discreet, which makes the whole process feel safe and stress-free.",
    stars: 5,
    author: "Adam H.",
  },
  {
    text: "I’ve ordered from Ember Trees several times now, and every experience has been excellent. The website is super easy to navigate, checkout is smooth, and I love how I can track my delivery in real time. The products always arrive fresh, neatly packaged, and exactly as described — no surprises. Their drivers are professional and discreet, which makes the whole process feel safe and stress-free.",
    stars: 4,
    author: "Adam H.",
  },
  {
    text: "I’ve ordered from Ember Trees several times now, and every experience has been excellent. The website is super easy to navigate, checkout is smooth, and I love how I can track my delivery in real time. The products always arrive fresh, neatly packaged, and exactly as described — no surprises. Their drivers are professional and discreet, which makes the whole process feel safe and stress-free.",
    stars: 1,
    author: "Adam H.",
  },
];

const faqsContent = [
  {
    question: "What areas do you deliver to?",
    answer:
      "We currently deliver throughout Georgetown, TX and surrounding areas including Leander, Cedar Park, Round Rock, Pflugerville, Hutto, and Liberty Hill. Use our delivery zone checker to confirm we serve your location. Delivery fees may vary by distance.",
  },
  {
    question: "Do I need to verify my age?",
    answer:
      "Yes, you must be 21 years or older to order from Ember Trees. We require age verification during account creation and again at delivery. A valid government-issued ID is necessary to confirm your age.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards including Visa, MasterCard, American Express, and Discover. We also accept Apple Pay and Google Pay for added convenience. Please note that we do not accept cash or checks.",
  },
  {
    question: "How fast is delivery?",
    answer:
      "Our average delivery time is between 30-60 minutes from the time you place your order. During peak hours or high demand, delivery times may be slightly longer. We provide real-time tracking so you can monitor your order status.",
  },
];

const leafSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="63"
    height="64"
    viewBox="0 0 63 64"
    fill="none"
  >
    <g opacity="0.37" clipPath="url(#clip0_2269_2747)">
      <mask
        id="mask0_2269_2747"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="77"
        height="76"
      >
        <path
          d="M0.772583 24.9634L51.6228 8.86168e-05L76.586 50.8503L25.7359 75.8136L0.772583 24.9634Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_2269_2747)">
        <path
          d="M60.1946 54.9533L48.6184 50.1187L58.6728 46.4975L66.647 38.6388L55.5524 40.1412L46.5381 45.8812L53.4914 33.2649L53.915 18.5953L46.3376 29.9404L43.2752 44.5907L38.1322 26.0805L25.5544 13.8495L27.6424 31.493L39.1417 46.8829L25.6778 40.3456L12.0677 39.4019L23.9328 48.0387L38.1671 50.2536L28.0086 53.663L20.0344 61.5218L31.129 60.0193L40.1433 54.2793L36.8882 66.3948L45.421 54.3178L60.1946 54.9533Z"
          fill="white"
        />
        <path
          d="M40.1433 54.2791L36.8882 66.3946L45.421 54.3176L60.1945 54.9531L48.6183 50.1186L58.6728 46.4973L66.647 38.6386L55.5524 40.1411L46.5381 45.8811L53.4914 33.2647L53.915 18.5952L46.3376 29.9403L43.2752 44.5906L40.1433 54.2791Z"
          fill="white"
        />
        <path
          d="M48.5218 63.3118L45.2368 56.6203L37.8519 67.076C37.5218 67.5428 36.9039 67.7071 36.3862 67.4642C35.8685 67.2212 35.6005 66.6399 35.7489 66.0875L38.2147 56.9042L31.7636 61.0135C31.6195 61.1052 31.4563 61.1654 31.2871 61.1884L20.1924 62.6908C19.6892 62.7589 19.1984 62.4967 18.9746 62.0408C18.7513 61.5851 18.8448 61.0381 19.2061 60.6817L27.1803 52.823L27.3918 52.6575C27.4676 52.611 27.5491 52.5723 27.6339 52.5438L33.1997 50.6743L23.7503 49.2044C23.5655 49.1755 23.3898 49.1035 23.2385 48.9935L11.3746 40.3561C10.9493 40.0465 10.7799 39.4929 10.9598 38.9986C11.1397 38.5043 11.6241 38.1887 12.1488 38.2248L25.7594 39.1694L25.9818 39.204C26.0546 39.2234 26.1255 39.2519 26.1936 39.2849L35.2916 43.7004L26.6978 32.1995C26.5737 32.0334 26.4944 31.8367 26.47 31.6308L24.3823 13.9881C24.3236 13.4919 24.5841 13.0121 25.0322 12.7909C25.4803 12.5699 26.0188 12.6555 26.377 13.0038L38.9548 25.2347C39.1044 25.3803 39.2125 25.5627 39.2685 25.7638L43.1095 39.5979L45.1826 29.6984L45.2491 29.4834C45.2782 29.414 45.3148 29.3471 45.3567 29.2842L52.9347 17.9404C53.2269 17.503 53.772 17.3112 54.2731 17.4708C54.7744 17.6307 55.1086 18.1033 55.0935 18.6292L54.6711 33.2982C54.6656 33.4856 54.6163 33.67 54.5259 33.8342L49.802 42.4032L54.9181 39.147L55.1467 39.0321C55.2264 39.003 55.31 38.9836 55.3946 38.9721L66.4892 37.4696C66.9921 37.4017 67.482 37.6623 67.706 38.1176C67.9298 38.5735 67.8371 39.1221 67.4755 39.4787L59.5013 47.3375C59.3797 47.4573 59.2322 47.5496 59.0715 47.6075L51.8728 50.1991L60.6484 53.8639C61.1762 54.0843 61.4723 54.6519 61.3479 55.2101C61.2235 55.7682 60.7155 56.1565 60.1443 56.1322L47.3555 55.5802L50.6405 62.2717C50.9277 62.8567 50.6863 63.5639 50.1012 63.8511C49.5161 64.1383 48.809 63.8969 48.5218 63.3118ZM28.7762 31.0405L40.0866 46.1764C40.4122 46.6122 40.3984 47.2141 40.0522 47.6338C39.7055 48.0534 39.115 48.1817 38.6253 47.9439L25.3661 41.5065L16.0777 40.8615L24.3927 46.9145L38.349 49.0862C38.8865 49.1699 39.2971 49.6121 39.3432 50.1542C39.3889 50.6961 39.0572 51.1989 38.5416 51.3719L28.6408 54.6943L23.3818 59.8772L30.7132 58.8844L39.509 53.285C39.9195 53.0236 40.4492 53.039 40.8416 53.3267C41.234 53.6147 41.4092 54.1164 41.2829 54.5865L39.7454 60.3047L44.4576 53.6365L44.5522 53.5207C44.7859 53.2659 45.121 53.1238 45.4714 53.1388L53.627 53.49L48.1647 51.2081C47.7155 51.0205 47.4257 50.5751 47.4379 50.0885C47.4502 49.602 47.7621 49.1736 48.2199 49.0087L58.0274 45.4753L63.2968 40.2822L55.9654 41.2751L47.1726 46.8754C46.7177 47.1651 46.1237 47.1103 45.7304 46.7412C45.3375 46.3723 45.244 45.784 45.5038 45.3118L52.3192 32.9429L52.6168 22.6593L47.4453 30.4055L44.4311 44.8319C44.3197 45.3647 43.857 45.7534 43.313 45.7711C42.7693 45.7885 42.2849 45.4309 42.1389 44.9069L37.0793 26.7024L27.1157 17.014L28.7762 31.0405Z"
          fill="white"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_2269_2747">
        <rect
          width="56.6472"
          height="56.6472"
          fill="white"
          transform="translate(0.772583 24.9634) rotate(-26.1473)"
        />
      </clipPath>
    </defs>
  </svg>
);

const howItWorksSection = (
  <section>
    <div className="flex flex-col py-[100px] md:mx-auto bg-white justify-center">
      <div className="flex flex-col text-center">
        <div className="text-[#2B2B2D] text-center font-roboto text-[32px] md:text-[48px] font-bold leading-[120%]">
          How It Works
        </div>
        <div className="text-[#606060] text-center font-roboto text-[20px] font-medium leading-normal">
          Simple, secure, and swift cannabis delivery in four easy steps
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-center items-center">
        <div className="flex flex-row flex-wrap items-center align-middle my-[25px]">
          <div className="flex md:p-[20px] flex-col items-center gap-[12px] bg-[#FFF4EF] rounded-[12px] md:h-[280px] w-full md:w-max mx-[12px] py-[12px]">
            <div className="flex w-20 h-20 p-[9.36px_42.12px] flex-col justify-center items-center gap-[15.6px] aspect-square rounded-[12.48px] bg-gradient-to-tl from-[#A4CAFE] to-[#DDEBFF] shadow-md relative">
              <p className="text-[#1A56DB] text-center font-roboto text-[37.44px] font-extralight leading-[130%] z-30">
                1
              </p>
              <div className="rotate-[-26.147deg] aspect-[1/1] absolute right-[10px] bottom-0 ">
                {leafSVG}
              </div>
            </div>
            <div className="text-[#2B2B2D] text-center font-roboto text-[20px] md:text-[24px] font-semibold leading-[130%]">
              Make an Account
            </div>
            <div className="max-w-[256px] break-words text-[#606060] text-center font-roboto text-[16px] font-normal leading-[150%] ">
              Create your secure account to access our premium cannabis menu
            </div>
          </div>
          <div className="flex md:p-[20px] flex-col items-center gap-[12px] bg-[#FFF4EF] rounded-[12px] md:h-[280px] w-full md:w-max mx-[12px] py-[12px] mt-[25px] md:mt-0">
            <div className="flex flex-col justify-center items-center w-[80px] h-[80px] p-[9.36px_42.12px] gap-[15.6px] aspect-square rounded-[12.48px] bg-gradient-to-tl from-[#A4FEA7] to-[#DDFFE6] shadow-md relative">
              <p className="text-[#046C4E] text-center font-roboto text-[37.44px] font-extralight leading-[130%] z-30">
                2
              </p>
              <div className="rotate-[-26.147deg] aspect-[1/1] absolute right-[10px] bottom-0 ">
                {leafSVG}
              </div>
            </div>
            <div className="text-[#2B2B2D] text-center font-roboto text-[20px] md:text-[24px] font-semibold leading-[130%]">
              Verify Age
            </div>
            <div className="max-w-[256px] break-words text-[#606060] text-center font-roboto text-[16px] font-normal leading-[150%] ">
              Confirm you{"'"}re 21+ and within our delivery zone
            </div>
          </div>
        </div>
        <div className=" flex flex-row flex-wrap items-center align-middle">
          <div className="flex md:p-[20px] flex-col items-center gap-[12px] bg-[#FFF4EF] rounded-[12px] md:h-[280px] w-full md:w-max mx-[12px] py-[12px]">
            <div className="flex w-20 h-20 p-[9.36px_42.12px] flex-col justify-center items-center gap-[15.6px] aspect-square rounded-[12.48px] bg-gradient-to-tl from-[#D4A4FE] to-[#F1DDFF] shadow-md relative">
              <p className="text-[#6C2BD9] text-center font-roboto text-[37.44px] font-extralight leading-[130%] z-30">
                3
              </p>
              <div className="rotate-[-26.147deg] aspect-[1/1] absolute right-[10px] bottom-0 ">
                {leafSVG}
              </div>
            </div>
            <div className="text-[#2B2B2D] text-center font-roboto text-[20px] md:text-[24px] font-semibold leading-[130%] max-w-[256px]">
              Browse our products and place an order
            </div>
            <div className="max-w-[256px] break-words text-[#606060] text-center font-roboto text-[16px] font-normal leading-[150%] ">
              Explore our curated selection of premium cannabis products and add
              items to cart
            </div>
          </div>
          <div className="flex md:p-[20px] flex-col items-center gap-[12px] bg-[#FFF4EF] rounded-[12px] md:h-[280px] w-full md:w-max mx-[12px] py-[12px] mt-[25px] md:mt-0">
            <div className="flex w-20 h-20 p-[9.36px_42.12px] flex-col justify-center items-center gap-[15.6px] aspect-square rounded-[12.48px] bg-gradient-to-tl from-[#FEC9A4] to-[#FFE4DD] shadow-md relative">
              <p className="text-[#8E4B10] text-center font-roboto text-[37.44px] font-extralight leading-[130%] z-30">
                4
              </p>
              <div className="rotate-[-26.147deg] aspect-[1/1] absolute right-[10px] bottom-0 ">
                {leafSVG}
              </div>
            </div>
            <div className="text-[#2B2B2D] text-center font-roboto text-[20px] md:text-[24px] font-semibold leading-[130%]">
              Fast Delivery
            </div>
            <div className="max-w-[256px] break-words text-[#606060] text-center font-roboto text-[16px] font-normal leading-[150%] ">
              Receive your order discreetly at your door within 30-60 minutes
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const heroSection = (
  <section className="relative w-full h-screen flex justify-center items-center align-middle">
    <video
      src="/videos/Cinematic.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover"
    />
    {/* Overlay content */}
    <div className="absolute inset-0 flex items-center justify-center flex-col">
      <Image
        src="/images/source-image.png"
        className="h-[131px] w-auto sm:h-[213px]"
        alt="brand"
        width={374}
        height={131}
      ></Image>

      <h1 className="text-white text-center font-roboto text-[32px] md:text-[60px] not-italic font-bold leading-[120%]">
        Cannabis, Delivered with Comfort.
      </h1>
      <div className="text-white text-center font-roboto text-[14px] md:text-[20px] font-normal leading-normal">
        Premium cannabis products delivered safely to your door in Georgetown,{" "}
        <span className="md:inline hidden">TX and surrounding areas.</span>{" "}
        <p className="md:block hidden">
          Experience elevated cannabis delivery with every order
        </p>
      </div>
      <div className="flex flex-row gap-[12px] justify-center items-center align-middle px-[20px] py-[10px] bg-[#BF2A36] rounded-[8px] md:mt-[50px] mt-[30px] w-fit mx-auto cursor-pointer hover:bg-orange-500">
        <div className="text-white">Sign In</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
        >
          <path d="M17.5 10.4998H2.5H17.5Z" fill="white" />
          <path
            d="M11.6667 4.6665L17.5 10.4998M17.5 10.4998L11.6667 16.3332M17.5 10.4998H2.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
    <div className="absolute flex flex-wrap justify-center bottom-0 gap-[10px] sm:gap-[36px] flex-[1_0_0] pb-[10px] sm:pb-[24px] w-full">
      <div className="flex bottom-0 flex-wrap justify-center items-end">
        <div className="flex px-3 py-1.5 justify-center items-center gap-[4px] md:gap-[10px]">
          <div className="w-[20px] h-[20px] flex align-middle justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.666 5.49885C5.56114 5.46285 8.34481 4.37731 10.5 2.44385C12.655 4.37767 15.4387 5.46357 18.334 5.49985C18.444 6.14985 18.5 6.81985 18.5 7.50085C18.5 12.7258 15.16 17.1708 10.5 18.8178C5.84 17.1698 2.5 12.7248 2.5 7.49985C2.5 6.81785 2.557 6.14985 2.666 5.49885ZM14.207 9.20685C14.3892 9.01825 14.49 8.76564 14.4877 8.50345C14.4854 8.24125 14.3802 7.99044 14.1948 7.80503C14.0094 7.61962 13.7586 7.51445 13.4964 7.51217C13.2342 7.5099 12.9816 7.61069 12.793 7.79285L9.5 11.0858L8.207 9.79285C8.0184 9.61069 7.7658 9.5099 7.5036 9.51217C7.2414 9.51445 6.99059 9.61962 6.80518 9.80503C6.61977 9.99044 6.5146 10.2413 6.51233 10.5034C6.51005 10.7656 6.61084 11.0182 6.793 11.2068L8.793 13.2068C8.98053 13.3943 9.23484 13.4996 9.5 13.4996C9.76516 13.4996 10.0195 13.3943 10.207 13.2068L14.207 9.20685Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-white font-roboto md:text-[18px] not-italic font-light md:leading-[150%]">
            Age 21+
          </div>
        </div>
        <div className="flex px-3 py-1.5 justify-center items-center gap-[4px] md:gap-[10px]">
          <div className="w-[20px] h-[20px] flex align-middle justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                d="M8.5 17C8.5 17.3978 8.34196 17.7794 8.06066 18.0607C7.77936 18.342 7.39782 18.5 7 18.5C6.60218 18.5 6.22064 18.342 5.93934 18.0607C5.65804 17.7794 5.5 17.3978 5.5 17C5.5 16.6022 5.65804 16.2206 5.93934 15.9393C6.22064 15.658 6.60218 15.5 7 15.5C7.39782 15.5 7.77936 15.658 8.06066 15.9393C8.34196 16.2206 8.5 16.6022 8.5 17ZM15.5 17C15.5 17.3978 15.342 17.7794 15.0607 18.0607C14.7794 18.342 14.3978 18.5 14 18.5C13.6022 18.5 13.2206 18.342 12.9393 18.0607C12.658 17.7794 12.5 17.3978 12.5 17C12.5 16.6022 12.658 16.2206 12.9393 15.9393C13.2206 15.658 13.6022 15.5 14 15.5C14.3978 15.5 14.7794 15.658 15.0607 15.9393C15.342 16.2206 15.5 16.6022 15.5 17Z"
                fill="white"
              />
              <path
                d="M3.5 4.5C3.23478 4.5 2.98043 4.60536 2.79289 4.79289C2.60536 4.98043 2.5 5.23478 2.5 5.5V15.5C2.5 15.7652 2.60536 16.0196 2.79289 16.2071C2.98043 16.3946 3.23478 16.5 3.5 16.5H4.55C4.66476 15.9349 4.97136 15.4268 5.41787 15.0618C5.86438 14.6969 6.42332 14.4975 7 14.4975C7.57668 14.4975 8.13562 14.6969 8.58213 15.0618C9.02864 15.4268 9.33524 15.9349 9.45 16.5H10.5C10.7652 16.5 11.0196 16.3946 11.2071 16.2071C11.3946 16.0196 11.5 15.7652 11.5 15.5V5.5C11.5 5.23478 11.3946 4.98043 11.2071 4.79289C11.0196 4.60536 10.7652 4.5 10.5 4.5H3.5ZM14.5 7.5C14.2348 7.5 13.9804 7.60536 13.7929 7.79289C13.6054 7.98043 13.5 8.23478 13.5 8.5V14.55C13.8217 14.4843 14.1533 14.4826 14.4757 14.545C14.7981 14.6074 15.105 14.7328 15.379 14.9139C15.6529 15.0949 15.8885 15.3282 16.0723 15.6004C16.256 15.8725 16.3844 16.1782 16.45 16.5H17.5C17.7652 16.5 18.0196 16.3946 18.2071 16.2071C18.3946 16.0196 18.5 15.7652 18.5 15.5V10.5C18.4999 10.2348 18.3946 9.98049 18.207 9.793L16.207 7.793C16.0195 7.60545 15.7652 7.50006 15.5 7.5H14.5Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-white font-roboto text-[18px] not-italic font-light md:leading-[150%]">
            Same - Day Delivery
          </div>
        </div>
        <div className="flex md:px-3 py-1.5 justify-center items-center gap-[4px] md:gap-[10px]">
          <div className="w-[20px] h-[20px] flex align-middle justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                d="M4.5 4.5C3.96957 4.5 3.46086 4.71071 3.08579 5.08579C2.71071 5.46086 2.5 5.96957 2.5 6.5V7.5H18.5V6.5C18.5 5.96957 18.2893 5.46086 17.9142 5.08579C17.5391 4.71071 17.0304 4.5 16.5 4.5H4.5Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.5 9.5H2.5V14.5C2.5 15.0304 2.71071 15.5391 3.08579 15.9142C3.46086 16.2893 3.96957 16.5 4.5 16.5H16.5C17.0304 16.5 17.5391 16.2893 17.9142 15.9142C18.2893 15.5391 18.5 15.0304 18.5 14.5V9.5ZM4.5 13.5C4.5 13.2348 4.60536 12.9804 4.79289 12.7929C4.98043 12.6054 5.23478 12.5 5.5 12.5H6.5C6.76522 12.5 7.01957 12.6054 7.20711 12.7929C7.39464 12.9804 7.5 13.2348 7.5 13.5C7.5 13.7652 7.39464 14.0196 7.20711 14.2071C7.01957 14.3946 6.76522 14.5 6.5 14.5H5.5C5.23478 14.5 4.98043 14.3946 4.79289 14.2071C4.60536 14.0196 4.5 13.7652 4.5 13.5ZM9.5 12.5C9.23478 12.5 8.98043 12.6054 8.79289 12.7929C8.60536 12.9804 8.5 13.2348 8.5 13.5C8.5 13.7652 8.60536 14.0196 8.79289 14.2071C8.98043 14.3946 9.23478 14.5 9.5 14.5H10.5C10.7652 14.5 11.0196 14.3946 11.2071 14.2071C11.3946 14.0196 11.5 13.7652 11.5 13.5C11.5 13.2348 11.3946 12.9804 11.2071 12.7929C11.0196 12.6054 10.7652 12.5 10.5 12.5H9.5Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-white font-roboto text-[18px] not-italic font-light md:leading-[150%]">
            Visa & Crypto Accepted
          </div>
        </div>
        <div className="flex md:px-3 px-2 py-1.5 justify-center items-center gap-[4px] md:gap-[10px]">
          <div className="w-[20px] h-[20px] flex align-middle justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.49999 2.5C7.30224 2.50004 7.10895 2.55871 6.94454 2.6686C6.78013 2.77848 6.65199 2.93465 6.57632 3.11735C6.50065 3.30005 6.48084 3.50108 6.51941 3.69503C6.55798 3.88898 6.65318 4.06715 6.79299 4.207L7.49999 4.914V8.672C7.49994 8.93719 7.39454 9.19151 7.20699 9.379L3.20699 13.379C1.31699 15.269 2.65599 18.5 5.32799 18.5H15.671C18.344 18.5 19.683 15.269 17.793 13.379L13.793 9.379C13.6054 9.19151 13.5001 8.93719 13.5 8.672V4.914L14.207 4.207C14.3468 4.06715 14.442 3.88898 14.4806 3.69503C14.5191 3.50108 14.4993 3.30005 14.4237 3.11735C14.348 2.93465 14.2199 2.77848 14.0555 2.6686C13.891 2.55871 13.6977 2.50004 13.5 2.5H7.49999ZM9.49999 8.672V4.5H11.5V8.672C11.5004 9.46724 11.8166 10.2298 12.379 10.792L13.406 11.82C12.6868 11.653 11.9354 11.6883 11.235 11.922L10.765 12.078C9.94387 12.3517 9.05612 12.3517 8.23499 12.078L7.67199 11.891C7.63435 11.8782 7.59633 11.8665 7.55799 11.856L8.62099 10.793C9.18364 10.2305 9.49982 9.46758 9.49999 8.672Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-white font-roboto text-[18px] not-italic font-light md:leading-[150%]">
            Lab Tested
          </div>
        </div>
      </div>
    </div>
  </section>
);

const aboutSection = (
  <section>
    <div className="w-full bg-[#88273F] py-[20px] md:py-[100px] px-[12px] md:px-[15px]">
      <div className="flex flex-col sm:flex-row justify-between py-[20px] md:py-[12px] lg:px-[100px]">
        <div className="flex flex-col justify-center items-center">
          <div className="text-white text-center font-roboto text-[32px] md:text-[48px] font-bold leading-[57.6px]">
            About Ember Trees
          </div>
          <div className="text-[#FF9FB7] text-center font-roboto md:text-[20px] text-[18px] font-medium leading-normal max-w-[540px]">
            Founded on principles of comfort, care, and quality, we{"'"}re
            revolutionizing cannabis delivery in Austin.
          </div>
          <Image
            src="/images/source-image.png"
            alt="logo"
            width={540}
            height={296}
          ></Image>
        </div>
        <div className="flex-col justify-center items-center align-middle relative md:w-fit w-full">
          <div className="p-[12px] md:p-[20px] flex flex-col justify-center items-center self-stretch gap-1.5 rounded-[12px] bg-white/10 max-w-[540px] mb-[18px]">
            <div className="flex w-[80px] h-[80px] px-[42.12px] py-[9.36px] flex-col justify-center items-center gap-[15.6px] aspect-square rounded-[12.48px] bg-gradient-to-t from-[#C5A4FE] to-[#F9DDFF] shadow-md relative">
              <div className="w-[40px] h-[40px] z-30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M5.57091 12.9634C5.94783 12.0535 6.50028 11.2267 7.19673 10.5302C7.89317 9.83378 8.71997 9.28132 9.62992 8.90441C10.5399 8.52749 11.5151 8.3335 12.5001 8.3335C13.485 8.3335 14.4603 8.52749 15.3702 8.90441C16.2802 9.28132 17.107 9.83378 17.8034 10.5302L20.0001 12.7269L22.1967 10.5302C23.6033 9.1237 25.5109 8.33352 27.5001 8.33352C29.4892 8.33352 31.3969 9.1237 32.8034 10.5302C34.2099 11.9368 35.0001 13.8444 35.0001 15.8336C35.0001 17.8227 34.2099 19.7304 32.8034 21.1369L20.0001 33.9402L7.19673 21.1369C6.50028 20.4405 5.94783 19.6137 5.57091 18.7037C5.194 17.7938 5 16.8185 5 15.8336C5 14.8486 5.194 13.8734 5.57091 12.9634Z"
                    stroke="#6C2BD9"
                    strokeWidth="3.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="w-[56.647px] h-[56.647px] rotate-[-0deg] aspect-square absolute right-[0px] bottom-[7px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="63"
                  height="64"
                  viewBox="0 0 63 64"
                  fill="none"
                >
                  <g opacity="0.37" clipPath="url(#clip0_2269_649)">
                    <mask
                      id="mask0_2269_649"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="77"
                      height="76"
                    >
                      <path
                        d="M0.772583 24.9634L51.6228 8.86168e-05L76.586 50.8503L25.7359 75.8136L0.772583 24.9634Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_2269_649)">
                      <path
                        d="M60.1946 54.9533L48.6184 50.1187L58.6728 46.4975L66.647 38.6388L55.5524 40.1412L46.5381 45.8812L53.4914 33.2649L53.915 18.5953L46.3377 29.9404L43.2752 44.5907L38.1322 26.0805L25.5544 13.8495L27.6425 31.493L39.1417 46.8829L25.6779 40.3456L12.0677 39.4019L23.9328 48.0387L38.1671 50.2536L28.0086 53.663L20.0344 61.5218L31.129 60.0193L40.1433 54.2793L36.8882 66.3948L45.421 54.3178L60.1946 54.9533Z"
                        fill="white"
                      />
                      <path
                        d="M40.1433 54.2791L36.8882 66.3946L45.4209 54.3176L60.1945 54.9531L48.6183 50.1186L58.6728 46.4973L66.647 38.6386L55.5524 40.1411L46.538 45.8811L53.4914 33.2647L53.915 18.5952L46.3376 29.9403L43.2751 44.5906L40.1433 54.2791Z"
                        fill="white"
                      />
                      <path
                        d="M48.5217 63.3118L45.2368 56.6203L37.8518 67.076C37.5217 67.5428 36.9038 67.7071 36.3862 67.4642C35.8685 67.2212 35.6005 66.6399 35.7489 66.0875L38.2146 56.9042L31.7635 61.0135C31.6195 61.1052 31.4563 61.1654 31.287 61.1884L20.1924 62.6908C19.6892 62.7589 19.1984 62.4967 18.9746 62.0408C18.7513 61.5851 18.8448 61.0381 19.2061 60.6817L27.1803 52.823L27.3918 52.6575C27.4676 52.611 27.549 52.5723 27.6339 52.5438L33.1996 50.6743L23.7503 49.2044C23.5655 49.1755 23.3898 49.1035 23.2385 48.9935L11.3746 40.3561C10.9492 40.0465 10.7799 39.4929 10.9597 38.9986C11.1397 38.5043 11.6241 38.1887 12.1488 38.2248L25.7594 39.1694L25.9818 39.204C26.0546 39.2234 26.1255 39.2519 26.1936 39.2849L35.2916 43.7004L26.6978 32.1995C26.5737 32.0334 26.4943 31.8367 26.47 31.6308L24.3823 13.9881C24.3236 13.4919 24.5841 13.0121 25.0322 12.7909C25.4802 12.5699 26.0188 12.6555 26.3769 13.0038L38.9548 25.2347C39.1044 25.3803 39.2124 25.5627 39.2684 25.7638L43.1095 39.5979L45.1826 29.6984L45.2491 29.4834C45.2782 29.414 45.3147 29.3471 45.3567 29.2842L52.9347 17.9404C53.2268 17.503 53.772 17.3112 54.2731 17.4708C54.7744 17.6307 55.1086 18.1033 55.0934 18.6292L54.671 33.2982C54.6656 33.4856 54.6163 33.67 54.5259 33.8342L49.8019 42.4032L54.9181 39.147L55.1467 39.0321C55.2264 39.003 55.31 38.9836 55.3946 38.9721L66.4892 37.4696C66.9921 37.4017 67.482 37.6623 67.706 38.1176C67.9298 38.5735 67.8371 39.1221 67.4755 39.4787L59.5013 47.3375C59.3796 47.4573 59.2322 47.5496 59.0715 47.6075L51.8728 50.1991L60.6484 53.8639C61.1762 54.0843 61.4723 54.6519 61.3478 55.2101C61.2235 55.7682 60.7155 56.1565 60.1443 56.1322L47.3555 55.5802L50.6405 62.2717C50.9277 62.8567 50.6863 63.5639 50.1012 63.8511C49.5161 64.1383 48.809 63.8969 48.5217 63.3118ZM28.7762 31.0405L40.0865 46.1764C40.4122 46.6122 40.3984 47.2141 40.0522 47.6338C39.7055 48.0534 39.115 48.1817 38.6253 47.9439L25.3661 41.5065L16.0777 40.8615L24.3927 46.9145L38.349 49.0862C38.8865 49.1699 39.2971 49.6121 39.3432 50.1542C39.3889 50.6961 39.0572 51.1989 38.5416 51.3719L28.6408 54.6943L23.3818 59.8772L30.7132 58.8844L39.509 53.285C39.9194 53.0236 40.4491 53.039 40.8416 53.3267C41.234 53.6147 41.4092 54.1164 41.2828 54.5865L39.7454 60.3047L44.4576 53.6365L44.5522 53.5207C44.7859 53.2659 45.121 53.1238 45.4714 53.1388L53.627 53.49L48.1647 51.2081C47.7155 51.0205 47.4257 50.5751 47.4378 50.0885C47.4502 49.602 47.762 49.1736 48.2199 49.0087L58.0273 45.4753L63.2967 40.2822L55.9653 41.2751L47.1726 46.8754C46.7177 47.1651 46.1236 47.1103 45.7304 46.7412C45.3375 46.3723 45.2439 45.784 45.5038 45.3118L52.3192 32.9429L52.6168 22.6593L47.4453 30.4055L44.431 44.8319C44.3197 45.3647 43.857 45.7534 43.3129 45.7711C42.7693 45.7885 42.2848 45.4309 42.1389 44.9069L37.0793 26.7024L27.1157 17.014L28.7762 31.0405Z"
                        fill="white"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_2269_649">
                      <rect
                        width="56.6472"
                        height="56.6472"
                        fill="white"
                        transform="translate(0.772583 24.9634) rotate(-26.1473)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="text-white text-center font-roboto text-[24px] font-semibold leading-[130%]">
              Make an Account
            </div>
            <div className="text-white text-center font-roboto text-[18px] font-normal leading-[150%]">
              Your well-being is our priority. We create a comfortable,
              stress-free experience from browsing to delivery.
            </div>
          </div>
          <div className="p-[12px] md:p-[20px] flex flex-col justify-center items-center self-stretch gap-1.5 rounded-[12px] bg-white/10 max-w-[540px] mb-[18px]">
            <div className="flex w-[80px] h-[80px] px-[42.12px] py-[9.36px] flex-col justify-center items-center gap-[15.6px] aspect-square rounded-[12.48px] bg-gradient-to-t from-[#FEA4A4] to-[#FDD] shadow-md relative">
              <div className="w-[40px] h-[40px] z-30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M20 7.25667C20.8957 6.24117 22.0795 5.52251 23.3937 5.19632C24.7079 4.87013 26.0903 4.95187 27.3569 5.43067C28.6235 5.90947 29.7143 6.76262 30.4841 7.8766C31.254 8.99058 31.6663 10.3126 31.6663 11.6667C31.6663 13.0208 31.254 14.3428 30.4841 15.4567C29.7143 16.5707 28.6235 17.4239 27.3569 17.9027C26.0903 18.3815 24.7079 18.4632 23.3937 18.137C22.0795 17.8108 20.8957 17.0922 20 16.0767M25 35H5V33.3333C5 30.6812 6.05357 28.1376 7.92893 26.2623C9.8043 24.3869 12.3478 23.3333 15 23.3333C17.6522 23.3333 20.1957 24.3869 22.0711 26.2623C23.9464 28.1376 25 30.6812 25 33.3333V35ZM25 35H35V33.3333C35.0002 31.5778 34.5384 29.8532 33.6608 28.3328C32.7832 26.8124 31.5208 25.5499 30.0006 24.672C28.4804 23.7942 26.7558 23.332 25.0004 23.3319C23.2449 23.3319 21.5203 23.7939 20 24.6717M21.6667 11.6667C21.6667 13.4348 20.9643 15.1305 19.714 16.3807C18.4638 17.631 16.7681 18.3333 15 18.3333C13.2319 18.3333 11.5362 17.631 10.286 16.3807C9.03571 15.1305 8.33333 13.4348 8.33333 11.6667C8.33333 9.89856 9.03571 8.20286 10.286 6.95262C11.5362 5.70238 13.2319 5 15 5C16.7681 5 18.4638 5.70238 19.714 6.95262C20.9643 8.20286 21.6667 9.89856 21.6667 11.6667Z"
                    stroke="#C81E1E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="w-[56.647px] h-[56.647px] rotate-[-0deg] aspect-square absolute right-[0px] bottom-[7px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="63"
                  height="64"
                  viewBox="0 0 63 64"
                  fill="none"
                >
                  <g opacity="0.37" clipPath="url(#clip0_2269_649)">
                    <mask
                      id="mask0_2269_649"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="77"
                      height="76"
                    >
                      <path
                        d="M0.772583 24.9634L51.6228 8.86168e-05L76.586 50.8503L25.7359 75.8136L0.772583 24.9634Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_2269_649)">
                      <path
                        d="M60.1946 54.9533L48.6184 50.1187L58.6728 46.4975L66.647 38.6388L55.5524 40.1412L46.5381 45.8812L53.4914 33.2649L53.915 18.5953L46.3377 29.9404L43.2752 44.5907L38.1322 26.0805L25.5544 13.8495L27.6425 31.493L39.1417 46.8829L25.6779 40.3456L12.0677 39.4019L23.9328 48.0387L38.1671 50.2536L28.0086 53.663L20.0344 61.5218L31.129 60.0193L40.1433 54.2793L36.8882 66.3948L45.421 54.3178L60.1946 54.9533Z"
                        fill="white"
                      />
                      <path
                        d="M40.1433 54.2791L36.8882 66.3946L45.4209 54.3176L60.1945 54.9531L48.6183 50.1186L58.6728 46.4973L66.647 38.6386L55.5524 40.1411L46.538 45.8811L53.4914 33.2647L53.915 18.5952L46.3376 29.9403L43.2751 44.5906L40.1433 54.2791Z"
                        fill="white"
                      />
                      <path
                        d="M48.5217 63.3118L45.2368 56.6203L37.8518 67.076C37.5217 67.5428 36.9038 67.7071 36.3862 67.4642C35.8685 67.2212 35.6005 66.6399 35.7489 66.0875L38.2146 56.9042L31.7635 61.0135C31.6195 61.1052 31.4563 61.1654 31.287 61.1884L20.1924 62.6908C19.6892 62.7589 19.1984 62.4967 18.9746 62.0408C18.7513 61.5851 18.8448 61.0381 19.2061 60.6817L27.1803 52.823L27.3918 52.6575C27.4676 52.611 27.549 52.5723 27.6339 52.5438L33.1996 50.6743L23.7503 49.2044C23.5655 49.1755 23.3898 49.1035 23.2385 48.9935L11.3746 40.3561C10.9492 40.0465 10.7799 39.4929 10.9597 38.9986C11.1397 38.5043 11.6241 38.1887 12.1488 38.2248L25.7594 39.1694L25.9818 39.204C26.0546 39.2234 26.1255 39.2519 26.1936 39.2849L35.2916 43.7004L26.6978 32.1995C26.5737 32.0334 26.4943 31.8367 26.47 31.6308L24.3823 13.9881C24.3236 13.4919 24.5841 13.0121 25.0322 12.7909C25.4802 12.5699 26.0188 12.6555 26.3769 13.0038L38.9548 25.2347C39.1044 25.3803 39.2124 25.5627 39.2684 25.7638L43.1095 39.5979L45.1826 29.6984L45.2491 29.4834C45.2782 29.414 45.3147 29.3471 45.3567 29.2842L52.9347 17.9404C53.2268 17.503 53.772 17.3112 54.2731 17.4708C54.7744 17.6307 55.1086 18.1033 55.0934 18.6292L54.671 33.2982C54.6656 33.4856 54.6163 33.67 54.5259 33.8342L49.8019 42.4032L54.9181 39.147L55.1467 39.0321C55.2264 39.003 55.31 38.9836 55.3946 38.9721L66.4892 37.4696C66.9921 37.4017 67.482 37.6623 67.706 38.1176C67.9298 38.5735 67.8371 39.1221 67.4755 39.4787L59.5013 47.3375C59.3796 47.4573 59.2322 47.5496 59.0715 47.6075L51.8728 50.1991L60.6484 53.8639C61.1762 54.0843 61.4723 54.6519 61.3478 55.2101C61.2235 55.7682 60.7155 56.1565 60.1443 56.1322L47.3555 55.5802L50.6405 62.2717C50.9277 62.8567 50.6863 63.5639 50.1012 63.8511C49.5161 64.1383 48.809 63.8969 48.5217 63.3118ZM28.7762 31.0405L40.0865 46.1764C40.4122 46.6122 40.3984 47.2141 40.0522 47.6338C39.7055 48.0534 39.115 48.1817 38.6253 47.9439L25.3661 41.5065L16.0777 40.8615L24.3927 46.9145L38.349 49.0862C38.8865 49.1699 39.2971 49.6121 39.3432 50.1542C39.3889 50.6961 39.0572 51.1989 38.5416 51.3719L28.6408 54.6943L23.3818 59.8772L30.7132 58.8844L39.509 53.285C39.9194 53.0236 40.4491 53.039 40.8416 53.3267C41.234 53.6147 41.4092 54.1164 41.2828 54.5865L39.7454 60.3047L44.4576 53.6365L44.5522 53.5207C44.7859 53.2659 45.121 53.1238 45.4714 53.1388L53.627 53.49L48.1647 51.2081C47.7155 51.0205 47.4257 50.5751 47.4378 50.0885C47.4502 49.602 47.762 49.1736 48.2199 49.0087L58.0273 45.4753L63.2967 40.2822L55.9653 41.2751L47.1726 46.8754C46.7177 47.1651 46.1236 47.1103 45.7304 46.7412C45.3375 46.3723 45.2439 45.784 45.5038 45.3118L52.3192 32.9429L52.6168 22.6593L47.4453 30.4055L44.431 44.8319C44.3197 45.3647 43.857 45.7534 43.3129 45.7711C42.7693 45.7885 42.2848 45.4309 42.1389 44.9069L37.0793 26.7024L27.1157 17.014L28.7762 31.0405Z"
                        fill="white"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_2269_649">
                      <rect
                        width="56.6472"
                        height="56.6472"
                        fill="white"
                        transform="translate(0.772583 24.9634) rotate(-26.1473)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="text-white text-center font-roboto text-[24px] font-semibold leading-[130%]">
              Care
            </div>
            <div className="text-white text-center font-roboto text-[18px] font-normal leading-[150%]">
              Every product is carefully selected and tested. Our team provides
              personalized recommendations and support.
            </div>
          </div>
          <div className="p-[12px] md:p-[20px] flex flex-col justify-center items-center self-stretch gap-1.5 rounded-[12px] bg-white/10 max-w-[540px] mb-[18px]">
            <div className="flex w-[80px] h-[80px] px-[42.12px] py-[9.36px] flex-col justify-center items-center gap-[15.6px] aspect-square rounded-[12.48px] bg-gradient-to-t from-[#A4ABFE] to-[#F0DDFF] shadow-md relative">
              <div className="w-[40px] h-[40px] z-30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.534 6.91021C13.8205 6.80749 15.0419 6.30147 16.024 5.46421C17.1333 4.51939 18.5429 4.00049 20 4.00049C21.4572 4.00049 22.8667 4.51939 23.976 5.46421C24.9582 6.30147 26.1795 6.80749 27.466 6.91021C28.9189 7.02632 30.2829 7.65613 31.3135 8.68674C32.3441 9.71734 32.9739 11.0813 33.09 12.5342C33.192 13.8202 33.698 15.0422 34.536 16.0242C35.4808 17.1335 35.9997 18.5431 35.9997 20.0002C35.9997 21.4574 35.4808 22.8669 34.536 23.9762C33.6988 24.9584 33.1927 26.1797 33.09 27.4662C32.9739 28.9191 32.3441 30.2831 31.3135 31.3137C30.2829 32.3443 28.9189 32.9741 27.466 33.0902C26.1795 33.1929 24.9582 33.6989 23.976 34.5362C22.8667 35.481 21.4572 35.9999 20 35.9999C18.5429 35.9999 17.1333 35.481 16.024 34.5362C15.0419 33.6989 13.8205 33.1929 12.534 33.0902C11.0812 32.9741 9.71716 32.3443 8.68656 31.3137C7.65595 30.2831 7.02614 28.9191 6.91002 27.4662C6.80731 26.1797 6.30129 24.9584 5.46402 23.9762C4.51921 22.8669 4.00031 21.4574 4.00031 20.0002C4.00031 18.5431 4.51921 17.1335 5.46402 16.0242C6.30129 15.042 6.80731 13.8207 6.91002 12.5342C7.02614 11.0813 7.65595 9.71734 8.68656 8.68674C9.71716 7.65613 11.0812 7.02632 12.534 6.91021ZM27.414 17.4142C27.7783 17.037 27.9799 16.5318 27.9754 16.0074C27.9708 15.483 27.7605 14.9814 27.3897 14.6106C27.0188 14.2398 26.5172 14.0294 25.9928 14.0249C25.4684 14.0203 24.9632 14.2219 24.586 14.5862L18 21.1722L15.414 18.5862C15.0368 18.2219 14.5316 18.0203 14.0072 18.0249C13.4828 18.0294 12.9812 18.2398 12.6104 18.6106C12.2396 18.9814 12.0292 19.483 12.0247 20.0074C12.0201 20.5318 12.2217 21.037 12.586 21.4142L16.586 25.4142C16.9611 25.7892 17.4697 25.9998 18 25.9998C18.5304 25.9998 19.039 25.7892 19.414 25.4142L27.414 17.4142Z"
                    fill="#5145CD"
                  />
                </svg>
              </div>
              <div className="w-[56.647px] h-[56.647px] rotate-[-0deg] aspect-square absolute right-[0px] bottom-[7px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="63"
                  height="64"
                  viewBox="0 0 63 64"
                  fill="none"
                >
                  <g opacity="0.37" clipPath="url(#clip0_2269_649)">
                    <mask
                      id="mask0_2269_649"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="77"
                      height="76"
                    >
                      <path
                        d="M0.772583 24.9634L51.6228 8.86168e-05L76.586 50.8503L25.7359 75.8136L0.772583 24.9634Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_2269_649)">
                      <path
                        d="M60.1946 54.9533L48.6184 50.1187L58.6728 46.4975L66.647 38.6388L55.5524 40.1412L46.5381 45.8812L53.4914 33.2649L53.915 18.5953L46.3377 29.9404L43.2752 44.5907L38.1322 26.0805L25.5544 13.8495L27.6425 31.493L39.1417 46.8829L25.6779 40.3456L12.0677 39.4019L23.9328 48.0387L38.1671 50.2536L28.0086 53.663L20.0344 61.5218L31.129 60.0193L40.1433 54.2793L36.8882 66.3948L45.421 54.3178L60.1946 54.9533Z"
                        fill="white"
                      />
                      <path
                        d="M40.1433 54.2791L36.8882 66.3946L45.4209 54.3176L60.1945 54.9531L48.6183 50.1186L58.6728 46.4973L66.647 38.6386L55.5524 40.1411L46.538 45.8811L53.4914 33.2647L53.915 18.5952L46.3376 29.9403L43.2751 44.5906L40.1433 54.2791Z"
                        fill="white"
                      />
                      <path
                        d="M48.5217 63.3118L45.2368 56.6203L37.8518 67.076C37.5217 67.5428 36.9038 67.7071 36.3862 67.4642C35.8685 67.2212 35.6005 66.6399 35.7489 66.0875L38.2146 56.9042L31.7635 61.0135C31.6195 61.1052 31.4563 61.1654 31.287 61.1884L20.1924 62.6908C19.6892 62.7589 19.1984 62.4967 18.9746 62.0408C18.7513 61.5851 18.8448 61.0381 19.2061 60.6817L27.1803 52.823L27.3918 52.6575C27.4676 52.611 27.549 52.5723 27.6339 52.5438L33.1996 50.6743L23.7503 49.2044C23.5655 49.1755 23.3898 49.1035 23.2385 48.9935L11.3746 40.3561C10.9492 40.0465 10.7799 39.4929 10.9597 38.9986C11.1397 38.5043 11.6241 38.1887 12.1488 38.2248L25.7594 39.1694L25.9818 39.204C26.0546 39.2234 26.1255 39.2519 26.1936 39.2849L35.2916 43.7004L26.6978 32.1995C26.5737 32.0334 26.4943 31.8367 26.47 31.6308L24.3823 13.9881C24.3236 13.4919 24.5841 13.0121 25.0322 12.7909C25.4802 12.5699 26.0188 12.6555 26.3769 13.0038L38.9548 25.2347C39.1044 25.3803 39.2124 25.5627 39.2684 25.7638L43.1095 39.5979L45.1826 29.6984L45.2491 29.4834C45.2782 29.414 45.3147 29.3471 45.3567 29.2842L52.9347 17.9404C53.2268 17.503 53.772 17.3112 54.2731 17.4708C54.7744 17.6307 55.1086 18.1033 55.0934 18.6292L54.671 33.2982C54.6656 33.4856 54.6163 33.67 54.5259 33.8342L49.8019 42.4032L54.9181 39.147L55.1467 39.0321C55.2264 39.003 55.31 38.9836 55.3946 38.9721L66.4892 37.4696C66.9921 37.4017 67.482 37.6623 67.706 38.1176C67.9298 38.5735 67.8371 39.1221 67.4755 39.4787L59.5013 47.3375C59.3796 47.4573 59.2322 47.5496 59.0715 47.6075L51.8728 50.1991L60.6484 53.8639C61.1762 54.0843 61.4723 54.6519 61.3478 55.2101C61.2235 55.7682 60.7155 56.1565 60.1443 56.1322L47.3555 55.5802L50.6405 62.2717C50.9277 62.8567 50.6863 63.5639 50.1012 63.8511C49.5161 64.1383 48.809 63.8969 48.5217 63.3118ZM28.7762 31.0405L40.0865 46.1764C40.4122 46.6122 40.3984 47.2141 40.0522 47.6338C39.7055 48.0534 39.115 48.1817 38.6253 47.9439L25.3661 41.5065L16.0777 40.8615L24.3927 46.9145L38.349 49.0862C38.8865 49.1699 39.2971 49.6121 39.3432 50.1542C39.3889 50.6961 39.0572 51.1989 38.5416 51.3719L28.6408 54.6943L23.3818 59.8772L30.7132 58.8844L39.509 53.285C39.9194 53.0236 40.4491 53.039 40.8416 53.3267C41.234 53.6147 41.4092 54.1164 41.2828 54.5865L39.7454 60.3047L44.4576 53.6365L44.5522 53.5207C44.7859 53.2659 45.121 53.1238 45.4714 53.1388L53.627 53.49L48.1647 51.2081C47.7155 51.0205 47.4257 50.5751 47.4378 50.0885C47.4502 49.602 47.762 49.1736 48.2199 49.0087L58.0273 45.4753L63.2967 40.2822L55.9653 41.2751L47.1726 46.8754C46.7177 47.1651 46.1236 47.1103 45.7304 46.7412C45.3375 46.3723 45.2439 45.784 45.5038 45.3118L52.3192 32.9429L52.6168 22.6593L47.4453 30.4055L44.431 44.8319C44.3197 45.3647 43.857 45.7534 43.3129 45.7711C42.7693 45.7885 42.2848 45.4309 42.1389 44.9069L37.0793 26.7024L27.1157 17.014L28.7762 31.0405Z"
                        fill="white"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_2269_649">
                      <rect
                        width="56.6472"
                        height="56.6472"
                        fill="white"
                        transform="translate(0.772583 24.9634) rotate(-26.1473)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="text-white text-center font-roboto text-[24px] font-semibold leading-[130%]">
              Quality
            </div>
            <div className="text-white text-center font-roboto text-[18px] font-normal leading-[150%]">
              Premium cannabis from trusted growers, lab-tested for potency and
              purity. Only the finest makes it to your door.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const testimonialSection = (
  <section className="bg-white">
    <div className="flex flex-col w-full justify-center items-center align-middle md:py-[100px] py-[20px] px-[15px]">
      <div className="flex flex-col w-full justify-center align-middle items-center md:gap-[12px] mb-[12px] md:mb-[24px]">
        <div className="text-[#2B2B2D] text-center font-roboto md:text-[48px] text-[28px] font-bold leading-[120%]">
          What Our Customers Say
        </div>
        <div className="text-[#606060] text-center font-medium text-[16px] md:text-[20px] not-italic leading-normal font-roboto">
          Real feedback from satisfied Ember Trees customers
        </div>
      </div>
      <div className="flex flex-row justify-center items-center align-middle w-full md:py-[20px] gap-[18px]">
        <div className="flex min-w-[24px] min-h-[24px] md:min-w-[40px] md:min-h-[40px]  flex-col justify-center items-center gap-[10px] rounded-[1000px] bg-[rgba(96,96,96,0.26)] backdrop-blur-[2px]">
          <div className="hidden md:block w-[20px] h-[20px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                d="M12.5 16.0334L6.66667 10.2L12.5 4.3667"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="md:hidden block w-[12px] h-[12px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
            >
              <path
                d="M7.5 10.2L4 6.69995L7.5 3.19995"
                stroke="white"
                strokeWidth="0.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center align-middle gap-[12px]">
          <div className="flex flex-row">
            {Array.from({ length: testimonials[0].stars }, (_, index) => {
              return (
                <div className="w-[34.4px] h-[34.4px]" key={index}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                    fill="none"
                  >
                    <path
                      d="M16.0998 2.21443C16.5515 1.30522 17.8485 1.30522 18.3003 2.21443L21.9896 9.63994C22.1685 9.99998 22.5123 10.2497 22.91 10.3086L31.1121 11.5228C32.1164 11.6715 32.5172 12.905 31.7921 13.6156L25.8701 19.419C25.583 19.7004 25.4517 20.1045 25.5186 20.5009L26.8984 28.6769C27.0674 29.678 26.0181 30.4403 25.1182 29.9703L17.7688 26.1315C17.4124 25.9454 16.9876 25.9454 16.6312 26.1315L9.28182 29.9703C8.38193 30.4403 7.33263 29.678 7.50159 28.6769L8.88141 20.5009C8.94831 20.1045 8.81702 19.7004 8.52987 19.419L2.60788 13.6156C1.88277 12.905 2.28357 11.6715 3.28787 11.5228L11.49 10.3086C11.8877 10.2497 12.2315 9.99998 12.4104 9.63993L16.0998 2.21443Z"
                      fill="#E3652F"
                    />
                  </svg>
                </div>
              );
            })}
          </div>
          <div className="max-w-[620px] text-center">
            “{testimonials[0].text}”
          </div>
          <div className="text-[#2B2B2D] text-center font-roboto text-base font-normal leading-6">
            {testimonials[0].author}
          </div>
        </div>
        <div className="flex min-w-[24px] min-h-[24px] md:min-w-[40px] md:min-h-[40px] flex-col justify-center items-center gap-[10px] rounded-[1000px] bg-[rgba(96,96,96,0.26)] backdrop-blur-[2px]">
          <div className="hidden md:block w-[20px] h-[20px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                d="M7.5 4.3667L13.3333 10.2L7.5 16.0334"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="block md:hidden w-[12px] h-[12px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
            >
              <path
                d="M4.5 3.19995L8 6.69995L4.5 10.2"
                stroke="white"
                strokeWidth="0.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const subscribeSection = (
  <section className="bg-white">
    <div className="w-full flex flex-col md:flex-row">
      <div className="w-full min-h-[300px] lg:min-h-[500px] xl:min-h-[700px] relative overflow-hidden">
        <Image
          src="/images/stayimage.png"
          alt="stay"
          fill
          className="object-cover"
        />
      </div>

      <div className="w-full bg-[#88273F] flex justify-center align-middle items-center flex-col py-[24px] gap-[24px] px-[12px]">
        <Image
          src="/images/embertree.png"
          width={320}
          height={132}
          alt="ember tree"
          className="md:w-[320px] w-[200px] aspect-[80/33]"
        ></Image>
        <div className="flex flex-col justify-center items-center align-middle max-w-[622px] gap-[12px]">
          <div className="text-white text-center font-robot md:text-[48px] text-[30px]  leading-[57.6px]">
            Stay in the Loop
          </div>
          <div className="text-[#FF9FB7] text-center font-robot md:text-[20px] text-[15px] leading-normal">
            Get updates on new products, exclusive deals, and cannabis education
            content
          </div>
        </div>
        <div className="flex md:flex-row flex-col max-w-[600px] justify-center items-center gap-2.5 align-middle w-full">
          <input
            className="flex items-center flex-1 p-3 px-4 rounded-[8px] border-0 border-[#88273F] bg-white w-full"
            placeholder="Enter your email"
          ></input>
          <div className="flex items-start bg-[#BF2A36] px-[20px] py-[10px] text-white cursor-pointer w-full md:w-fit justify-center rounded-[8px]">
            Subscribe
          </div>
        </div>
      </div>
    </div>
  </section>
);

const whychooseusSection = (
  <section className="bg-white">
    <div className="py-[20px] md:py-[100px] px-[12px] md:px-[15px] md:gap-[24px] gap-[12px]">
      <div className="flex flex-col gap-[6px] md:gap-[12px] justify-center items-center align-middle">
        <div className="text-[#2B2B2D] text-center font-roboto flex font-bold text-3xl md:text-4xl leading-[1.2]">
          Why Choose Us
        </div>
        <div className="text-[#606060] text-center font-roboto md:text-[20px] text-[18px] font-medium leading-normal">
          Experience the difference with premium cannabis delivery
        </div>
      </div>
      <div className="flex md:py-[20px] flex-wrap w-full gap-[18px] md:gap-[36px]">
        <div className="flex md:flex-row flex-col md:gap-[36px] w-full justify-center items-center align-middle">
          <div className="flex md:flex-row flex-col items-start md:items-center gap-3 md:gap-6 p-5 xl:min-w-[600px] md:max-w-[600px] flex-1 shadow-md rounded-[12px] w-full">
            <div className="flex flex-col justify-center items-center w-[57px] h-[57px] md:w-[80px] md:h-[80px] md:p-[9.36px_42.12px] p-[6.67px_30.01px] aspect-[1/1] rounded-[12.48px] bg-[linear-gradient(1deg,#ABFEA4_1.04%,#E2FFDD_98.96%)]">
              <div className="md:w-[40px] md:h-[40px] w-[28.5px] h-[28.5px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="fit"
                  height="fit"
                  viewBox="0 0 40 41"
                  fill="none"
                >
                  <path
                    d="M14.0237 31.5903C14.6488 30.9651 15 30.1173 15 29.2332C15 28.3492 14.6488 27.5013 14.0237 26.8762C13.3986 26.2511 12.5507 25.8999 11.6667 25.8999C10.7826 25.8999 9.93476 26.2511 9.30964 26.8762C8.68452 27.5013 8.33333 28.3492 8.33333 29.2332C8.33333 30.1173 8.68452 30.9651 9.30964 31.5903C9.93476 32.2154 10.7826 32.5666 11.6667 32.5666C12.5507 32.5666 13.3986 32.2154 14.0237 31.5903Z"
                    stroke="#046C4E"
                  />
                  <path
                    d="M30.6903 31.5903C31.3155 30.9651 31.6667 30.1173 31.6667 29.2332C31.6667 28.3492 31.3155 27.5013 30.6903 26.8762C30.0652 26.2511 29.2174 25.8999 28.3333 25.8999C27.4493 25.8999 26.6014 26.2511 25.9763 26.8762C25.3512 27.5013 25 28.3492 25 29.2332C25 30.1173 25.3512 30.9651 25.9763 31.5903C26.6014 32.2154 27.4493 32.5666 28.3333 32.5666C29.2174 32.5666 30.0652 32.2154 30.6903 31.5903Z"
                    stroke="#046C4E"
                  />
                  <path
                    d="M21.6667 27.5665V10.8998C21.6667 10.4578 21.4911 10.0339 21.1785 9.72131C20.8659 9.40875 20.442 9.23315 20 9.23315H6.66667C6.22464 9.23315 5.80072 9.40875 5.48816 9.72131C5.17559 10.0339 5 10.4578 5 10.8998V27.5665C5 28.0085 5.17559 28.4324 5.48816 28.745C5.80072 29.0576 6.22464 29.2332 6.66667 29.2332H8.33333M21.6667 27.5665C21.6667 28.0085 21.4911 28.4324 21.1785 28.745C20.8659 29.0576 20.442 29.2332 20 29.2332H15M21.6667 27.5665V14.2332C21.6667 13.7911 21.8423 13.3672 22.1548 13.0546C22.4674 12.7421 22.8913 12.5665 23.3333 12.5665H27.6433C28.0853 12.5666 28.5092 12.7422 28.8217 13.0548L34.5117 18.7448C34.8242 19.0573 34.9999 19.4812 35 19.9232V27.5665C35 28.0085 34.8244 28.4324 34.5118 28.745C34.1993 29.0576 33.7754 29.2332 33.3333 29.2332H31.6667M21.6667 27.5665C21.6667 28.0085 21.8423 28.4324 22.1548 28.745C22.4674 29.0576 22.8913 29.2332 23.3333 29.2332H25M8.33333 29.2332C8.33333 30.1172 8.68452 30.9651 9.30964 31.5902C9.93477 32.2153 10.7826 32.5665 11.6667 32.5665C12.5507 32.5665 13.3986 32.2153 14.0237 31.5902C14.6488 30.9651 15 30.1172 15 29.2332M8.33333 29.2332C8.33333 28.3491 8.68452 27.5013 9.30964 26.8761C9.93477 26.251 10.7826 25.8998 11.6667 25.8998C12.5507 25.8998 13.3986 26.251 14.0237 26.8761C14.6488 27.5013 15 28.3491 15 29.2332M31.6667 29.2332C31.6667 30.1172 31.3155 30.9651 30.6904 31.5902C30.0652 32.2153 29.2174 32.5665 28.3333 32.5665C27.4493 32.5665 26.6014 32.2153 25.9763 31.5902C25.3512 30.9651 25 30.1172 25 29.2332M31.6667 29.2332C31.6667 28.3491 31.3155 27.5013 30.6904 26.8761C30.0652 26.251 29.2174 25.8998 28.3333 25.8998C27.4493 25.8998 26.6014 26.251 25.9763 26.8761C25.3512 27.5013 25 28.3491 25 29.2332"
                    stroke="#046C4E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-3 flex-1">
              <div className="text-center text-[var(--Text-Heading,#2B2B2D)] font-roboto text-[20px] md:text-[24px] font-semibold leading-[130%]">
                Same-Day Delivery
              </div>
              <div className="text-[var(--Text-Muted,#606060)] font-roboto text-[14px] md:text-[16px] font-normal leading-[150%]">
                Order before 6 PM and receive your products the same day. Fast,
                reliable service you can count on.
              </div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col items-start md:items-center gap-3 md:gap-6 p-5 xl:min-w-[600px] md:max-w-[600px] flex-1 shadow-md rounded-[12px] w-full">
            <div className="flex flex-col justify-center items-center w-[57px] h-[57px] md:w-[80px] md:h-[80px] md:p-[9.36px_42.12px] p-[6.67px_30.01px] aspect-[1/1] rounded-[12.48px] bg-[linear-gradient(1deg,#B7A4FE_1.04%,#E9DDFF_98.96%)]">
              <div className="md:w-[40px] md:h-[40px] w-[28.5px] h-[28.5px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="fit"
                  height="fit"
                  viewBox="0 0 40 41"
                  fill="none"
                >
                  <path
                    d="M32.38 26.6133C31.9147 26.1479 31.322 25.8307 30.6767 25.7016L26.6983 24.9067C24.5177 24.4706 22.254 24.7738 20.265 25.7683L19.735 26.0317C17.746 27.0262 15.4823 27.3294 13.3017 26.8933L10.0833 26.25C9.54532 26.1425 8.98911 26.1695 8.46404 26.3285C7.93897 26.4875 7.46127 26.7737 7.07332 27.1616M13.3333 7.56665H26.6667L25 9.23332V17.8533C25.0002 18.7373 25.3515 19.585 25.9767 20.21L34.31 28.5433C36.41 30.6433 34.9217 34.2333 31.9517 34.2333H8.04665C5.07665 34.2333 3.58999 30.6433 5.68999 28.5433L14.0233 20.21C14.6485 19.585 14.9998 18.7373 15 17.8533V9.23332L13.3333 7.56665Z"
                    stroke="#5145CD"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-3 flex-1">
              <div className="text-center text-[var(--Text-Heading,#2B2B2D)] font-roboto text-[20px] md:text-[24px] font-semibold leading-[130%]">
                Lab Tested Quality
              </div>
              <div className="text-[var(--Text-Muted,#606060)] font-roboto text-[14px] md:text-[16px] font-normal leading-[150%]">
                Every product is third-party lab tested for potency, purity, and
                safety. Quality you can trust.
              </div>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:gap-[36px] w-full justify-center items-center align-middle">
          <div className="flex md:flex-row flex-col items-start md:items-center gap-3 md:gap-6 p-5 xl:min-w-[600px] md:max-w-[600px] flex-1 shadow-md rounded-[12px] w-full">
            <div className="flex flex-col justify-center items-center w-[57px] h-[57px] md:w-[80px] md:h-[80px] md:p-[9.36px_42.12px] p-[6.67px_30.01px] aspect-[1/1] rounded-[12.48px] bg-[linear-gradient(1deg,#A4CAFE_1.04%,#DDEBFF_98.96%)]">
              <div className="md:w-[40px] md:h-[40px] w-[28.5px] h-[28.5px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="fit"
                  height="fit"
                  viewBox="0 0 40 41"
                  fill="none"
                >
                  <path
                    d="M15 20.9L18.3333 24.2333L25 17.5666M34.3633 10.8733C29.0935 11.1532 23.9279 9.331 20 5.80664C16.0721 9.331 10.9065 11.1532 5.63667 10.8733C5.21256 12.5152 4.99863 14.2042 5.00001 15.9C5.00001 25.2183 11.3733 33.05 20 35.27C28.6267 33.05 35 25.22 35 15.9C35 14.1633 34.7783 12.48 34.3633 10.8733Z"
                    stroke="#1A56DB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-3 flex-1">
              <div className="text-center text-[var(--Text-Heading,#2B2B2D)] font-roboto text-[20px] md:text-[24px] font-semibold leading-[130%]">
                Secure & Discreet
              </div>
              <div className="text-[var(--Text-Muted,#606060)] font-roboto text-[14px] md:text-[16px] font-normal leading-[150%]">
                Age verification and secure packaging ensure your privacy and
                compliance with local regulations.
              </div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col items-start md:items-center gap-3 md:gap-6 p-5 xl:min-w-[600px] md:max-w-[600px] flex-1 shadow-md rounded-[12px] w-full">
            <div className="flex flex-col justify-center items-center w-[57px] h-[57px] md:w-[80px] md:h-[80px] md:p-[9.36px_42.12px] p-[6.67px_30.01px] aspect-[1/1] rounded-[12.48px] bg-[linear-gradient(1deg,#FEC7A4_1.04%,#FFEDDD_98.96%)]">
              <div className="md:w-[40px] md:h-[40px] w-[28.5px] h-[28.5px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="fit"
                  height="fit"
                  viewBox="0 0 40 41"
                  fill="none"
                >
                  <path
                    d="M20 8.15657C20.8957 7.14107 22.0795 6.42242 23.3937 6.09623C24.7079 5.77003 26.0903 5.85177 27.3569 6.33057C28.6235 6.80937 29.7143 7.66252 30.4841 8.7765C31.254 9.89048 31.6663 11.2125 31.6663 12.5666C31.6663 13.9207 31.254 15.2427 30.4841 16.3566C29.7143 17.4706 28.6235 18.3238 27.3569 18.8026C26.0903 19.2814 24.7079 19.3631 23.3937 19.0369C22.0795 18.7107 20.8957 17.9921 20 16.9766M25 35.8999H5V34.2332C5 31.5811 6.05357 29.0375 7.92893 27.1622C9.8043 25.2868 12.3478 24.2332 15 24.2332C17.6522 24.2332 20.1957 25.2868 22.0711 27.1622C23.9464 29.0375 25 31.5811 25 34.2332V35.8999ZM25 35.8999H35V34.2332C35.0002 32.4777 34.5384 30.7531 33.6608 29.2327C32.7832 27.7124 31.5208 26.4498 30.0006 25.5719C28.4804 24.6941 26.7558 24.2319 25.0004 24.2318C23.2449 24.2318 21.5203 24.6938 20 25.5716M21.6667 12.5666C21.6667 14.3347 20.9643 16.0304 19.714 17.2806C18.4638 18.5309 16.7681 19.2332 15 19.2332C13.2319 19.2332 11.5362 18.5309 10.286 17.2806C9.03571 16.0304 8.33333 14.3347 8.33333 12.5666C8.33333 10.7985 9.03571 9.10277 10.286 7.85252C11.5362 6.60228 13.2319 5.8999 15 5.8999C16.7681 5.8999 18.4638 6.60228 19.714 7.85252C20.9643 9.10277 21.6667 10.7985 21.6667 12.5666Z"
                    stroke="#B43403"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-3 flex-1">
              <div className="text-center text-[var(--Text-Heading,#2B2B2D)] font-roboto text-[20px] md:text-[24px] font-semibold leading-[130%]">
                Expert Support
              </div>
              <div className="text-[var(--Text-Muted,#606060)] font-roboto text-[14px] md:text-[16px] font-normal leading-[150%]">
                Our knowledgeable team provides personalized recommendations and
                support throughout your experience.
              </div>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:gap-[36px] w-full justify-center items-center align-middle">
          <div className="flex md:flex-row flex-col items-start md:items-center gap-3 md:gap-6 p-5 xl:min-w-[600px] md:max-w-[600px] flex-1 shadow-md rounded-[12px] w-full">
            <div className="flex flex-col justify-center items-center w-[57px] h-[57px] md:w-[80px] md:h-[80px] md:p-[9.36px_42.12px] p-[6.67px_30.01px] aspect-[1/1] rounded-[12.48px] bg-[linear-gradient(1deg,#FEA4C5_1.04%,#FFDDF4_98.96%)]">
              <div className="md:w-[40px] md:h-[40px] w-[28.5px] h-[28.5px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="fit"
                  height="fit"
                  viewBox="0 0 40 41"
                  fill="none"
                >
                  <path
                    d="M20 13.7332V20.3999L25 25.3999M35 20.3999C35 22.3697 34.612 24.3203 33.8582 26.1402C33.1044 27.96 31.9995 29.6136 30.6066 31.0065C29.2137 32.3994 27.5601 33.5043 25.7403 34.2581C23.9204 35.0119 21.9698 35.3999 20 35.3999C18.0302 35.3999 16.0796 35.0119 14.2597 34.2581C12.4399 33.5043 10.7863 32.3994 9.3934 31.0065C8.00052 29.6136 6.89563 27.96 6.14181 26.1402C5.38799 24.3203 5 22.3697 5 20.3999C5 16.4217 6.58035 12.6063 9.3934 9.7933C12.2064 6.98026 16.0218 5.3999 20 5.3999C23.9782 5.3999 27.7936 6.98026 30.6066 9.7933C33.4196 12.6063 35 16.4217 35 20.3999Z"
                    stroke="#BF125D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-3 flex-1">
              <div className="text-center text-[var(--Text-Heading,#2B2B2D)] font-roboto text-[20px] md:text-[24px] font-semibold leading-[130%]">
                Average Delivery Time
              </div>
              <div className="text-[var(--Text-Muted,#606060)] font-roboto text-[14px] md:text-[16px] font-normal leading-[150%]">
                30-60 minutes in most areas
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const faqsSection = (
  <section className="bg-[#FFF4EF]">
    <div className="md:py-[100px] md:px-[15px] py-[20px] px-[12px] flex flex-col gap-[12px] md:gap-[24px] justify-center items-center align-middle">
      <div className="flex flex-col justify-center items-center align-middle gap-[6px] md:gap-[12px]">
        <div className="text-[#2B2B2D] text-center md:text-[48px] text-[24px] font-semibold md:leading-[120%] leading-[130%] font-roboto">
          Frequently Asked
        </div>
        <div className="text-[#606060] text-center md:text-[20px] text-[14px] font-normal leading-[118%] font-roboto md:font-medium md:leading-normal">
          Common questions about our cannabis delivery service
        </div>
      </div>
      <div className="md:py-[20px] py-[12px] gap-[18px] md:gap-[36px] flex flex-col justify-center align-middle items-center md:max-w-[1000px] max-x-[500px] w-full">
        {faqsContent.map((faq, index) => {
          return (
            <div className="bg-white w-full p-[12px] md:p-[24px] rounded-[12px] shadow-md" key={index}>
            <Disclosure>
          {({ open }) => (
            <>
              <DisclosureButton className={`flex w-full justify-between items-center rounded-lg  text-left text-sm font-medium text-[16px] md:text-[20px] focus:outline-none focus-visible:ring pb-1 ${open ? "border-b-2" : ""}`}>
                <span>{faq.question}</span>
                <ChevronDownIcon
                  className={`h-5 w-5 transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </DisclosureButton>

              <Transition
                show={open}
                enter="transition-all duration-300 ease-out"
                enterFrom="max-h-0 opacity-0"
                enterTo="max-h-40 opacity-100"
                leave="transition-all duration-200 ease-in"
                leaveFrom="max-h-40 opacity-100"
                leaveTo="max-h-0 opacity-0"
              >
                <DisclosurePanel
                  static
                  className="overflow-hidden px-4 pt-4 pb-2 text-gray-600 w-auto text-[14px] md:text-[18px]"
                >
                  {faq.answer}
                </DisclosurePanel>
              </Transition>
            </>
          )}
        </Disclosure>
        </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {heroSection}
      {howItWorksSection}
      {aboutSection}
      {testimonialSection}
      {subscribeSection}
      {whychooseusSection}
      {faqsSection}
    </div>
  );
}
