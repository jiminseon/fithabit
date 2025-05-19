
import { Layout } from '@/components/Layout/Layout';
import { AppList } from '@/components/AppRestriction/AppList';

const AppRestriction = () => {
  return (
    <Layout>
      <div className="container-app">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">앱 제한 설정</h1>
          <p className="text-fithabit-gray">방해 요소를 제한하고 목표에 집중하세요.</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 card-shadow">
          <p className="text-fithabit-gray mb-6">
            피트니스 목표에서 주의를 분산시키는 앱을 선택하세요. 특정 시간 동안 접근을 제한하여 집중력을 유지할 수 있습니다.
          </p>
          <AppList />
        </div>
      </div>
    </Layout>
  );
};

export default AppRestriction;
