import { Unity, useUnityContext } from "react-unity-webgl";

const Game = () => {
    const { unityProvider } = useUnityContext({
        loaderUrl: "Build/webgl-07h22.loader.js",
        dataUrl: "Build/webgl-07h22.data",
        frameworkUrl: "Build/webgl-07h22.framework.js",
        codeUrl: "Build/webgl-07h22.wasm",
    });
      return <Unity unityProvider={unityProvider} style={{
        width: '100%' ,
        height: '100%'
      }}/>;
  };

  export default Game;