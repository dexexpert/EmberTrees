"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // ✅ import this

import { FiInstagram, FiShield } from "react-icons/fi";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="w-full bg-[#88273F] text-white py-[20px] md:py-[80px] px-[12px] md:px-[15px]">
      <div className="md:px-[43px] flex flex-col gap-[18px] md:gap-[36px]">
        <div className="flex flex-col gap-[6px] md:gap-[18px] justify-center items-center text-center align-middle">
          <div className="gap-[12px] flex flex-row justify-center items-center align-middle">
            <FiShield className="hidden md:block" size={48} color="#E3652F" />
            <FiShield className="block md:hidden" size={24} color="#E3652F" />
            <div className="font-roboto font-medium md:font-semibold text-[20px] md:text-[32px] leading-normal md:leading-[130%]">
              Legal Compliance
            </div>
          </div>
          <div className="text-white text-center font-roboto text-[13px] md:text-[20px] font-light md:font-normal leading-normal">
            All orders are fulfilled in accordance with applicable local and
            state laws. Must be 21+ with valid ID.
          </div>
          <div className="text-[#FF9FB7] text-[14px] md:text-[16px] font-normal leading-[118%] md:leading-[150%]">
            Please consume responsibly. Keep out of reach of children and pets.
          </div>
        </div>
        <div className="flex lg:flex-row flex-col w-full justify-between">
          <div className="w-full lg:block flex justify-center items-center align-middle lg:mb-0 mb-[30px] flex-1">
            <div className="flex flex-col gap-[12px] w-fit">
              <div className="gap-[6px] flex flex-col justify-center items-center align-middle">
                <Image
                  src="/images/embertree.png"
                  width={175}
                  height={78}
                  alt="Ember Trees"
                />
                <div className="text-white font-medium md:font-semibold text-[20px] md:text-[24px] leading-normal md:leading-[130%] font-roboto">
                  Ember Trees
                </div>
                <div className="text-[#FF9FB7] font-[14px] md:text-[16px] md:font-normal leading-[118%] md:leading-[150%] font-roboto text-center max-w-[400px]">
                  Premium cannabis delivery service in Georgetown, TX and
                  surrounding areas. Cannabis, delivered with care.
                </div>
              </div>
              <div className="flex flex-row justify-center align-middle items-center gap-[9px] md:gap-[18px]">
                <FiInstagram
                  size={35.1}
                  color="#FF9FB7"
                  className=" md:block hidden cursor-pointer"
                />
                <FaXTwitter
                  size={35.1}
                  color="#FF9FB7"
                  className=" md:block hidden cursor-pointer"
                />
                <FaFacebook
                  size={35.1}
                  color="#FF9FB7"
                  className=" md:block hidden cursor-pointer"
                />
                <FiInstagram
                  size={17.55}
                  color="#FF9FB7"
                  className=" md:hidden block cursor-pointer"
                />
                <FaXTwitter
                  size={17.55}
                  color="#FF9FB7"
                  className=" md:hidden block cursor-pointer"
                />
                <FaFacebook
                  size={17.55}
                  color="#FF9FB7"
                  className=" md:hidden block cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row gap-[10px] md:flex-nowrap flex-wrap flex-1 justify-center align-middle">
            <div className="w-full flex flex-row gap-[10px] flex-2">
              <div className="flex flex-col w-full gap-[12px]  font-roboto">
                <div className="text-white md:text-[24px] md:font-semibold md:leading-[130%] text-[20px] font-medium leading-normal">
                  Shop
                </div>
                <div className="text-[#FF9FB7] flex flex-col gap-[6px] text-[16px] font-normal leading-[150%]">
                  <div>Flower</div>
                  <div>Pre-Rolls</div>
                  <div>Edibles</div>
                  <div>Vapes</div>
                  <div>Concentrates</div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-[12px]  font-roboto">
                <div className="text-white md:text-[24px] md:font-semibold md:leading-[130%] text-[20px] font-medium leading-normal">
                  Company
                </div>
                <div className="text-[#FF9FB7] flex flex-col gap-[6px] text-[16px] font-normal leading-[150%]">
                  <div>Blogs</div>
                  <div>About Us</div>
                  <div>Delivery Areas</div>
                  <div>How it Works</div>
                  <div>Contact Us</div>
                  <div>Careers</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-[12px] flex-1 font-roboto">
              <div className="text-white md:text-[24px] md:font-semibold md:leading-[130%] text-[20px] font-medium leading-normal">
                Support
              </div>
              <div className="text-[#FF9FB7] flex flex-col gap-[6px] text-[16px] font-normal leading-[150%]">
                <div>FAQ</div>
                <div>Track Order</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border-[#FF9FB7] border-b-[2px] opacity-50"></div>
        <div className="gap-[10px] flex md:flex-row flex-col justify-between text-[14px] md:text-[16px] text-[#FF9FB7]">
          <div className="md:text-start text-center">
            © 2025 Ember Trees. All rights reserved.
          </div>
          <div className="flex flex-row items-center justify-center gap-[12px] ">
            <div>21+ Only</div>
            <div className="w-[6px] h-[6px] rounded-[16px] bg-[#FF9FB7]"></div>
            <div>Licensed</div>
            <div className="w-[6px] h-[6px] rounded-[16px] bg-[#FF9FB7]"></div>
            <div>Delivery Only</div>
          </div>
        </div>
        <div className="w-full text-center font-roboto text-[14px] md:text-[16px] font-normal md:font-medium leading-[118%] md:leading-[150%] text-[#FF9FB7]">
          Legal Disclaimer: All products contain hemp-derived THC-A, compliant
          with the 2018 Farm Bill. Ember Trees only delivers within legal areas.
          Adult signature required at delivery. This product has not been
          evaluated by the FDA. Not for use by minors, pregnant or nursing
          women. Keep out of reach of children and pets.
        </div>
      </div>
    </div>
  );
}
