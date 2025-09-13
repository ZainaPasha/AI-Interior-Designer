"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import React from "react";

interface CustomBreadCrumbProps {
  breadCrumbItems?: { link: string; label: string }[];
  breadCrumbPage: string;
}
export const CustomBreadCrumb = ({
  breadCrumbPage,
  breadCrumbItems,
}: CustomBreadCrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="flex items-center justify-center hover:text-indigo-400"
          >
            <Home className="w-4 h-4 mr-2" /> Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadCrumbItems && (
          <React.Fragment>
            {breadCrumbItems.map((item, index) => (
              <React.Fragment key={index + item.link}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink className="hover:text-indigo-400" href={item.link}>{item.label}</BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </React.Fragment>
        )}

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{breadCrumbPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
