'use client';
import PackageHeader from '@/components/packages/header';
import PackageTabs from '@/components/packages/tabs';

const PackageInformationPage = () => {
  return (
    <main className='w-full'>
      <PackageHeader />
      <PackageTabs />
    </main>
  );
};

export default PackageInformationPage;
