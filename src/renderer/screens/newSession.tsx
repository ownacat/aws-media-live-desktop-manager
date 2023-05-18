import { useRef } from 'react';
import Button from 'ui/button/button';
import Input from 'ui/input/input';
import { useDispatch } from 'react-redux';
import { authenticate } from 'store/auth';
import awsMediaStore from 'api/awsMediaStore';
import { useNavigate } from 'react-router-dom';

export default function NewSession() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refEndpoint = useRef<HTMLInputElement>(null);
  const refToken = useRef<HTMLInputElement>(null);
  const refSecret = useRef<HTMLInputElement>(null);

  const submit = async () => {
    const endpoint = refEndpoint.current?.value as string;
    const awsToken = refToken.current?.value as string;
    const awsSecret = refSecret.current?.value as string;

    const success = await awsMediaStore.authenticate(
      awsSecret,
      awsToken,
      endpoint
    );
    if (success) {
      dispatch(
        authenticate({
          endpoint,
          awsSecret,
          awsToken,
        })
      );
      navigate('/browser');
    }
  };

  return (
    <div className="relative flex min-h-full flex-col justify-center px-6 py-12  dark:bg-boxdark bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          New session
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
        <form className="space-y-6" action="#" method="POST">
          <Input
            id="endpoint"
            ref={refEndpoint}
            label="Container Endpoint"
            type="text"
            placeholder="https://tv5kdp1zg6s76b.data.mediastore.eu-central-1.amazonaws.com"
            required
          />

          <Input
            id="token"
            ref={refToken}
            label="AWS TOKEN"
            type="text"
            placeholder="AKIA3TO1G7LKZZCC3Y5G"
            required
          />

          <Input
            id="secret"
            ref={refSecret}
            label="AWS SECRET"
            type="password"
            placeholder="Qtfa1DWxCvGzC2gFUVipQjt++kMmKztAXiGW5I7l"
            required
          />

          <Button.Primary onClick={submit} className="w-full ">
            START NEW SESSION
          </Button.Primary>
        </form>
      </div>
    </div>
  );
}
