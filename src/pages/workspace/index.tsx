import { sidebarStyle } from '@workspace/styles/sidebarStyle';
import { Sidebar } from '@workspace/components/Sidebar';
import { TurmRangeSelector } from '@workspace/components/TurmRangeSelector';
import { GroupStatistics } from '@workspace/components/GroupStatistics';
import { Posts } from '@workspace/components/Posts';
import { workspaceLayout } from '@workspace/styles/layout';
import { workspaceMainWrapper } from '@workspace/styles/workspaceStyle';
import { ProfileSkeleton } from '@shared/components/suspense/ProfileSkeleton';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { CommonErrorFallback } from '@shared/components/CommonErrorFallback';

const WorkspacePage = () => (
  <main css={workspaceLayout}>
    <aside css={sidebarStyle}>
      <CompositionBoundaryReactQuery
        suspense={<ProfileSkeleton count={4} />}
        error={(prop) => <CommonErrorFallback {...prop} />}
      >
        <Sidebar />
      </CompositionBoundaryReactQuery>
      <CompositionBoundaryReactQuery
        suspense={<ProfileSkeleton count={4} />}
        error={(prop) => <CommonErrorFallback {...prop} />}
      >
        <TurmRangeSelector />
      </CompositionBoundaryReactQuery>
    </aside>
    <section css={workspaceMainWrapper}>
      <GroupStatistics />
      <Posts />
    </section>
  </main>
);
export default WorkspacePage;
