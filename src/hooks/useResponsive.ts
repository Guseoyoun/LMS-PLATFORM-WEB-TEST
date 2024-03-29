import React, { useEffect, useState } from 'react';

/*defaultValue가 window넓이보다 크면 true를 반환합니다. 이하의 넓이일 때 상태를 사용하려면 false일 경우로 연산해야합니다. 
예기치 않은 동작을 야기합니다.(nextjs 사용시 , 따로 설정필요 dynamic)
*/
/**
 * defaultValue가 window넓이보다 크면 true를 반환합니다. 이하의 넓이일 때 상태를 사용하려면 false일 경우로 연산해야합니다.
 * @param defaultValue
 * @returns boolean
 */
export default function useResponsive(defaultValue = 768) {
  const [isDesktop, setDesktop] = useState(
    typeof window !== 'undefined' && window.innerWidth >= defaultValue ? true : false
  );
  const reloadWidthHandle = () => {
    if (window.innerWidth >= defaultValue) setDesktop(true);
    if (window.innerWidth < defaultValue) setDesktop(false);
  };
  useEffect(() => {
    window.addEventListener('resize', reloadWidthHandle);
    return () => {
      window.removeEventListener('resize', reloadWidthHandle);
    };
  }, []);
  return isDesktop;
}
