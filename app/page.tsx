"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Layout from "./components/layout";
import React from "react";

export default function Home() {
  return (
    <main className={styles.main}>
      <Layout>Home Page</Layout>
    </main>
  );
}
