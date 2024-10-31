import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const TableLoader = () => {
  return (
    <SkeletonTheme baseColor="red" highlightColor="#444">
      <Skeleton count={5} />
    </SkeletonTheme>
  );
};

export default TableLoader;
