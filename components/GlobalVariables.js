import React, { createContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Globals = createContext();

export const GlobalVariables = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingText, setIsLoadingText] = useState('');
  const [mobile, setMobile] = useState('');
  const [computer, setComputer] = useState('');

  const router = useRouter();

  useEffect(() => {
    setMobile(window.innerWidth <= 768);
    setComputer(window.innerWidth >= 1280);
  }, []);

  const getAddressLink = (address, name) => {
    const link = (
      <Link href={`/portfolio/${address}`}>
        <a className="text-gold">{name}</a>
      </Link>
    );
    return link;
  };

  const getTimestampDate = (timestamp) => {
    const date = new Date(timestamp * 1000);

    // Format it in a readable manner
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate()
    ).padStart(2, '0')}`;
    return formattedDate;
  };

  const openAddress = (address) => {
    router.push(`/portfolio/${address}`);
  };

  const goHome = () => {
    router.push('/');
  };

  return (
    <Globals.Provider
      value={{
        isLoading,
        setIsLoading,
        isLoadingText,
        setIsLoadingText,
        getAddressLink,
        getTimestampDate,
        openAddress,
        goHome,
        mobile,
      }}
    >
      {children}
    </Globals.Provider>
  );
};
