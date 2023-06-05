import dynamic from 'next/dynamic';

interface Props {
  children: React.ReactNode;
}
const DynamicWrapper = (props: Props) => {
  const { children } = props;
  return <>{children}</>;
};

export default dynamic(() => Promise.resolve(DynamicWrapper), {
  ssr: false
});
