/* eslint-disable react/jsx-props-no-spreading */
import Button from 'ui/button/button';
import Input from 'ui/input/input';
import { useDispatch } from 'react-redux';
import { authenticate } from 'store/auth';
import awsMediaStore from 'api/awsMediaStore';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  awsSecret: string;
  awsToken: string;
  endpoint: string;
};

export default function NewSession() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(async (data) => {
    const success = await awsMediaStore.authenticate(
      data.awsSecret,
      data.awsToken,
      data.endpoint
    );

    if (success) {
      dispatch(
        authenticate({
          endpoint: data.endpoint,
          awsSecret: data.awsSecret,
          awsToken: data.awsToken,
        })
      );
      navigate('/browser');
    } else {
      setError('root.credentialsError', {
        type: 'credentialsError',
        message:
          'Invalid AWS credentials.\nMake sure you disable CORS rules for your container.',
      });
    }
  });

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
            label="Container Endpoint"
            type="text"
            placeholder="https://tv5kdp1zg6s76b.data.mediastore.eu-central-1.amazonaws.com"
            {...register('endpoint', {
              required: 'Required',
            })}
            error={errors.endpoint?.message}
          />

          <Input
            id="token"
            label="AWS TOKEN"
            type="text"
            placeholder="AKIA3TO1G7LKZZCC3Y5G"
            {...register('awsToken', {
              required: 'Required',
            })}
            error={errors.awsToken?.message}
          />

          <Input
            id="secret"
            label="AWS SECRET"
            type="password"
            placeholder="Qtfa1DWxCvGzC2gFUVipQjt++kMmKztAXiGW5I7l"
            {...register('awsSecret', {
              required: 'Required',
            })}
            error={errors.awsSecret?.message}
          />
          {errors.root?.credentialsError && (
            <p className="mt-2 text-sm text-center text-red-600 dark:text-red-500">
              {errors.root?.credentialsError?.message}
            </p>
          )}
          <Button.Primary
            onClick={onSubmit}
            className="w-full "
            disabled={!isValid}
          >
            START NEW SESSION
          </Button.Primary>
        </form>
      </div>
    </div>
  );
}
