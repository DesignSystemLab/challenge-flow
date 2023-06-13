import { Suspense } from 'react';
import { sidebarStyle } from '@workspace/styles/sidebarStyle';
import { Sidebar } from '@workspace/components/Sidebar';
import { TurmRangeSelector } from '@workspace/components/TurmRangeSelector';
import { GroupStatistics } from '@workspace/components/GroupStatistics';
import { Posts } from '@workspace/components/Posts';
import { workspaceLayout } from '@workspace/styles/layout';
import { workspaceMainWrapper } from '@workspace/styles/workspaceStyle';
import DynamicWrapper from '@shared/components/DynamicWrapper';
import { ProfileSkeleton } from '@shared/components/suspense/ProfileSkeleton';

const WorkspacePage = () => (
  <main css={workspaceLayout}>
    <aside css={sidebarStyle}>
      <DynamicWrapper>
        <Suspense fallback={<ProfileSkeleton count={4} />}>
          <Sidebar />
        </Suspense>
        <Suspense fallback={<h2>loading.3.</h2>}>
          <TurmRangeSelector />
        </Suspense>
      </DynamicWrapper>
    </aside>
    <section css={workspaceMainWrapper}>
      <GroupStatistics />
      <Posts />
    </section>
  </main>
);
export default WorkspacePage;
