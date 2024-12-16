"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const breadcrumbNameMap: { [key: string]: string } = {
  "/dashboard": "Dashboard",
  "/analytics": "Analytics",
  "/providers": "Providers",
  "/leads": "Leads",
  "/payments": "Payments",
  "/settings": "Settings",
  "/support": "Support",
  "/messages": "Messages",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          let breadcrumbName = breadcrumbNameMap[href] || segment;

          // Handle dynamic segments (like provider IDs)
          if (segment.match(/^[0-9a-f-]{36}$/)) {
            // If the previous segment was 'providers', this is a provider detail page
            if (pathSegments[index - 1] === "providers") {
              breadcrumbName = "Provider Details";
            } else {
              breadcrumbName = "Details";
            }
          }

          // Capitalize first letter if not found in map
          if (!breadcrumbNameMap[href]) {
            breadcrumbName = segment.charAt(0).toUpperCase() + segment.slice(1);
          }

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{breadcrumbName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{breadcrumbName}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
