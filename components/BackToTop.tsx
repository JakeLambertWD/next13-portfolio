"use client";

import { urlFor } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";

const BackToTop = ({ pageInfo }: any) => {
  return (
    <Link href="#hero">
      <footer className="sticky w-full cursor-pointer bottom-7 bottom-5 tooltip" data-tip="Back to Top">
        <div className="avatar online">
          <Image
            className="mx-auto rounded-full  object-cover object-center"
            src={urlFor(pageInfo?.heroImage).url()}
            alt={pageInfo?.name}
            width={50}
            height={50}
          />
        </div>
      </footer>
    </Link>
  );
};

export default BackToTop;
