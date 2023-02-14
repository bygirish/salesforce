import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

function navigate(name: any, params = {}) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

function canGoBack(): boolean {
  if (navigationRef.isReady()) {
    return navigationRef.canGoBack()
  }
  return false;
}


export default { navigate, goBack, canGoBack };
