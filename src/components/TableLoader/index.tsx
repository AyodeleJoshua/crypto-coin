import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function TableLoader() {
  return (
    <SkeletonTheme baseColor="red" highlightColor="#444">
      <Skeleton count={5} />
    </SkeletonTheme>
  );
}

export default TableLoader;
