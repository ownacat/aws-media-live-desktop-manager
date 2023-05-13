import { useRef } from 'react';
import Button from 'ui/button/button';
import Input from 'ui/input/input';

export default function NewSession() {
  const refArn = useRef<HTMLInputElement>(null);
  const refToken = useRef<HTMLInputElement>(null);
  const refSecret = useRef<HTMLInputElement>(null);

  const submit = async () => {
    console.log(refArn.current?.value);
  };

  return (
    <div className="relative flex min-h-full flex-col justify-center px-6 py-12  dark:bg-boxdark bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          New session
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <Input
            id="arn"
            ref={refArn}
            label="MEDIA STORE ARN"
            type="text"
            placeholder="arn:aws:mediastore:us-east-1:123456789012:container/mycontainer"
            required
          />

          <Input
            id="token"
            ref={refToken}
            label="AWS TOKEN"
            type="text"
            placeholder="TOKEN"
            required
          />

          <Input
            id="secret"
            ref={refSecret}
            label="AWS SECRET"
            type="password"
            placeholder="*********"
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
