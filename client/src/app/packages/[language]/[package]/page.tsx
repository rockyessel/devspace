import PackageHeader from '@/components/packages/header';
import PackageTabs from '@/components/packages/tabs';
import { getPackageByName } from '@/utils/services/api';

interface Props {
  params: {
    language: string;
    package: string;
  };
}

const PackageInformationPage = async (props: Props) => {

const data = await getPackageByName(props.params.language, props.params.package)

console.log('Data: ', data)

  console.log('Params: ',props.params);
  return (
    <main className='w-full'>
      <PackageHeader data={data.metaData} />
      <PackageTabs />
    </main>
  );
};

export default PackageInformationPage;
