import Header from '../component/header';

const PrimaryLayout = ({children}) => {
  return (
    <div className="primary-layout">
      <Header />
        {children}
    </div>
  )
}

export default PrimaryLayout;