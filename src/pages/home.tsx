import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from '../auth/auth-config';
import HomeBanner from '../components/Home/homeBanner';
import AboutUs from '../components/Home/aboutUs';
import WhatWeDo from '../components/Home/whatWeDo';
import OurMission from '../components/Home/ourMission';
import Shirts from '../components/Home/shirts';
import { useSections } from '../hooks/useSections';
import { getSections } from '../api/sections';
import { useEffect } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const { instance } = useMsal();
  const auth = useIsAuthenticated();
  const { sections, setSections } = useSections();
  const firstSection = sections.find((section) => section.sectionNumber === 1);
  const secondSection = sections.find((section) => section.sectionNumber === 2);
  const thirdSection = sections.find((section) => section.sectionNumber === 3);

  const fetchSections = async () => {
    await getSections(setSections);
  };

  const fetchAccessToken = async () => {
    const accounts = instance.getAllAccounts();
    const accessToken = (
      await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
    ).accessToken;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  };

  if (auth) {
    navigate('/pi-home');
    fetchAccessToken();
  }

  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <div className="bg-deepBlue min-h-screen overflow-x-hidden pt-20 text-white">
      <Navbar />
      <HomeBanner />
      <AboutUs section={firstSection} />
      <div className="h-1 w-full rounded-full bg-gradient-to-l from-yellow-300 to-orange-500 shadow-[0_0_20px_2px_rgba(253,224,71,0.7)]" />
      <WhatWeDo section={secondSection} />
      <div className="h-1 w-full rounded-full bg-gradient-to-r from-yellow-300 to-orange-500 shadow-[0_0_20px_2px_rgba(251,146,60,0.7)]" />
      <Shirts />
      <div className="h-1 w-full rounded-full bg-gradient-to-l from-yellow-300 to-orange-500 shadow-[0_0_20px_2px_rgba(253,224,71,0.7)]" />
      <OurMission section={thirdSection} />
      <div className="h-1 w-full rounded-full bg-gradient-to-r from-yellow-300 to-orange-500 shadow-[0_0_20px_2px_rgba(251,146,60,0.7)]" />
      <Footer />
    </div>
  );
}
