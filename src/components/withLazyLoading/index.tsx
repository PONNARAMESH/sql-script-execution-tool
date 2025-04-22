/* eslint-disable */
import {
  lazy,
  ComponentType,
  LazyExoticComponent,
  useEffect,
  useState,
  Suspense,
} from "react";

export const withLazyLoading = (componentFilePath: string) => {
  return (props: any) => {
    const [LoadedComponent, setLoadedComponent] = useState<LazyExoticComponent<
      ComponentType<any>
    > | null>(null);

    useEffect(() => {
      setLoadedComponent(
        lazy(() => {
          return import(componentFilePath);
        }),
      );
    }, [componentFilePath]);

    return (
      <Suspense fallback={<div> Loading ...</div>}>
        {LoadedComponent && <LoadedComponent {...props} />}
      </Suspense>
    );
  };
};
/* eslint-enable */
