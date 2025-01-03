import { useState } from 'react';
import { Modal, Spinner, Table } from '../../components';
import styles from './home.module.css';
import useCoinsQuery from '../../customHooks/useCoinsQuery';

function Home() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [itemDetails, setItemDetails] = useState<
    Record<string, string | number>
  >({});

  const columns = [
    {
      key: 'name',
      title: '💰 Coin',
      isActionTrigger: true,
      handleAction: (data: Record<string, string | number>) => {
        setShowDetailsModal(true);
        setItemDetails(data);
      },
    },
    { key: 'symbol', title: '📄 Code' },
    { key: 'price_usd', title: '🤑 Price' },
    { key: 'tsupply', title: '📈 Total Supply' },
  ];

  const [queryParams, setQueryParams] = useState({
    page: 0,
    pageSize: 10,
  });

  const {
    isLoadingAllCoinsData,
    allCoinsData,
    isAllCoinsFetchError,
    allCoinsError,
  } = useCoinsQuery(queryParams);

  return (
    <>
      {isLoadingAllCoinsData && !allCoinsData && <Spinner />}

      {!isLoadingAllCoinsData && allCoinsData && (
        <Table
          columns={columns}
          dataSource={allCoinsData}
          showPagination
          currentPage={queryParams.page}
          pageSize={queryParams.pageSize}
          onPaginationChange={(_, newPage) =>
            setQueryParams({ ...queryParams, page: newPage })
          }
          testId="all-coins-table"
        />
      )}

      {!isLoadingAllCoinsData && isAllCoinsFetchError && (
        <div className={styles.errorContainer}>
          <div>
            <p>{allCoinsError?.message.toString()}</p>
            <p>Try again later</p>
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        show={showDetailsModal}
        cancelModal={() => {
          setShowDetailsModal(false);
        }}
      >
        <table>
          {Object.keys(itemDetails).map((d, i) => (
            <tr key={i}>
              <th style={{ textAlign: 'left' }}>{d}</th>
              <td>{itemDetails[d]}</td>
            </tr>
          ))}
        </table>
      </Modal>
    </>
  );
}

export default Home;
