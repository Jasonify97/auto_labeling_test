import os
from FastSAM.fastsam import FastSAM, FastSAMPrompt

class FSAM:
    def __init__(self):
        self.DIR_PATH = os.path.dirname(os.path.realpath(__file__))
        self.model = FastSAM(f'{self.DIR_PATH}/weights/FastSAM_x.pt')
        self.DEVICE = 'cpu'

    def execute_fsam(self, image_path):
        everything_results = self.model(image_path, device=self.DEVICE, retina_masks=True, imgsz=1024, conf=0.4, iou=0.9,)
        prompt_process = FastSAMPrompt(image_path, everything_results, device=self.DEVICE)
        ann = prompt_process.everything_prompt()
        prompt_process.plot(
            annotations=ann,
            output_path=f'{self.DIR_PATH}/output/test.jpg',
            mask_random_color=True,
            better_quality=True,
            retina=False,
            withContours=True,
        )
        output_path = f'{self.DIR_PATH}/output/test.jpg'
        results = everything_results[0].boxes.xyxy
        results = results.cpu().numpy()
        results = results.tolist()
        return results, output_path

if __name__=="__main__":
    fs = FSAM()
    fs.execute_fsam('/home/youna/Project/auto_labeling/images/cat.jpg')