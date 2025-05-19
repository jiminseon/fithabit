
import { Layout } from '@/components/Layout/Layout';
import { AppList } from '@/components/AppRestriction/AppList';

const AppRestriction = () => {
  return (
    <Layout>
      <div className="container-app">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">App Restrictions</h1>
          <p className="text-fithabit-gray">Limit distractions and stay focused on your goals.</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 card-shadow">
          <p className="text-fithabit-gray mb-6">
            Select apps that distract you from your fitness goals. You can restrict access during specific hours to help you stay focused.
          </p>
          <AppList />
        </div>
      </div>
    </Layout>
  );
};

export default AppRestriction;
