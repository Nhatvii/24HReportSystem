import 'package:capstone_project/models/send_report_page_model.dart';
import 'package:capstone_project/presenters/send_report_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class LocationTextPart extends StatelessWidget {
  final SendReportPageModel sendReportPageModel;
  final SendReportPagePresenter sendReportPagePresenter;
  const LocationTextPart(
      {Key? key,
      required this.sendReportPageModel,
      required this.sendReportPagePresenter})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              margin: EdgeInsets.only(bottom: 0.01.sh),
              child: Text(
                'Địa Điểm Xảy Ra ',
                style: TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w700),
              ),
            ),
            Text('*',
                style: TextStyle(
                    color: Colors.red,
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w700)),
          ],
        ),
        SizedBox(
          child: TypeAheadField(
            hideSuggestionsOnKeyboardHide: true,
            // hideOnEmpty: true,
            hideOnError: true,
            direction: AxisDirection.down,
            debounceDuration: const Duration(seconds: 1),
            textFieldConfiguration: TextFieldConfiguration(
              decoration: InputDecoration(
                isDense: true,
                prefixIcon: const Icon(
                  Icons.search,
                  size: 25,
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(0.02.sh)),
                ),
                hintText: 'Nhập địa điểm',
              ),
              controller: sendReportPageModel.location,
            ),
            suggestionsCallback: (pattern) =>
                sendReportPageModel.mapApi.getListPlaceByKeyWord(pattern),
            itemBuilder: (context, Map? suggestion) {
              return ListTile(
                leading: const Icon(Icons.location_on),
                title: Text(suggestion!['title']),
                subtitle: Text(suggestion['address']),
              );
            },
            onSuggestionSelected: (Map? suggestion) {
              sendReportPagePresenter.chooseLocation(suggestion!);
            },
            noItemsFoundBuilder: (context) {
              return SizedBox(
                height: 0.1.sh,
                child: const Center(
                  child: Text('Không tìm thấy kết quả'),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
