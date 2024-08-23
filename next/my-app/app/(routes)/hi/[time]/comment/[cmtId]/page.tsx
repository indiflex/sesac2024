type Params = {
  params: {
    time: string;
    cmtId: string;
  };
};
export default function Comment({ params }: Params) {
  return (
    <h3 className='3xl text-center text-danger'>
      {params.time} &gt; {params.cmtId}
    </h3>
  );
}
