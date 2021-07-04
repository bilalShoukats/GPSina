export default errorCode => {
  switch (errorCode) {
    case '1000':
      return 'login successful';
    case '1001':
      return 'user not found';
    case '1002':
      return 'password incorrect';
    case '1003':
      return 'no token provided';
    case '1004':
      return 'failed to authenticate token';
    case '1005':
      return 'token expired please login again';
    case '1006':
      return 'wrong token for wrong id';
    case '1007':
      return 'user already exist';
    case '1008':
      return 'Registration successful';
    case '1009':
      return 'User not activated';
    case '1010':
      return 'Link not found';
    case '1011':
      return 'Link expired';
    case '1012':
      return 'User mismatched';
    case '1013':
      return 'Email confirmed';
    case '1014':
      return "User already active, can't send actiavtion email";
    case '1015':
      return 'Email resent';
    case '1016':
      return '2FA failed';
    case '1017':
      return 'A message has been sent to your registered number';
    case '1018':
      return "User already active, can't send actiavtion sms";
    case '1019':
      return 'Car successfully added';
    case '1020':
      return 'Current and new default are same';
    case '1021':
      return 'Default changed successfully';
    case '1022':
      return 'Car updated';
    case '1023':
      return 'Car deleted';
    case '1024':
      return 'User updated successfully';
    case '1025':
      return 'Old password incorrect';
    case '1026':
      return 'New password hash failed';
    case '1027':
      return 'Buyer updated';
    case '1028':
      return 'Both password same';
    case '1029':
      return 'An email has been sent to your account with instructions to change password';
    case '1030':
      return 'Password reset';
    case '1031':
      return 'Category insertion failed';
    case '1032':
      return 'Category successfully inserted';
    case '1033':
      return 'Parent Category not found';
    case '1034':
      return 'New Name not defined';
    case '1035':
      return 'Category Updated';
    case '1036':
      return 'Parent name not provided';
    case '1037':
      return 'Parent changed successfully';
    case '1038':
      return 'Parent not found';
    case '1039':
      return "Can't add product without category";
    case '1040':
      return 'Merchant name is required field';
    case '1041':
      return 'Merchant zip code is required field';
    case '1042':
      return 'Merchant adding failed';
    case '1043':
      return 'Merchant successfully added';
    case '1044':
      return 'Merchant not found';
    case '1045':
      return 'Category not found';
    case '1046':
      return "More than one items can't be main";
    case '1047':
      return 'There is no asset set as default';
    case '1048':
      return 'Product Saving failed';
    case '1049':
      return 'Product saved successfully';
    case '1050':
      return "Product Slug can't be empty";
    case '1051':
      return 'Product not found';
    case '1052':
      return 'Rating is expected';
    case '1053':
      return 'Merchant not found';
    case '1054':
      return 'Review saved successfully';
    case '1055':
      return 'Error saving review';
    case '1056':
      return 'Changing parent failed';
    case '1057':
      return 'unable to remove category';
    case '1058':
      return 'Category tree deleted';
    case '1059':
      return 'Category has failed menu to build, please update categories';
    case '1060':
      return 'Menu fetching failed';
    case '1061':
      return 'Menu successful';
    case '1062':
      return 'Already add to fav products';
    case '1063':
      return 'DB Failure product list not available';
    case '1064':
      return 'In order to get product lists for category, Please provide the category';
    case '1065':
      return 'Category products successfull';
    case '1066':
      return 'Please provide merchant ID in order to get the products';
    case '1067':
      return "You requested products for merchants which doesn't exists";
    case '1068':
      return 'Merchant/admin products successfull';
    case '1069':
      return "User seems to be suspicious, can't give you products";
    case '1070':
      return 'Failed to update user';
    case '1071':
      return 'User must have a role';
    case '1072':
      return 'Cannot assign role to the user';
    case '1073':
      return 'Finding merchant parent got problem';
    case '1074':
      return 'Favorite Product added';
    case '1075':
      return 'Favorite Merchant added';
    case '1076':
      return 'Password reset email sent';
    case '1077':
      return 'Remove favorite product ';
    case '1078':
      return 'Remove favorite merchant ';
    case '1079':
      return 'Get product reviews';
    case '1080':
      return 'Get merchant reviews';
    case '1081':
      return 'Unable to add distributor';
    case '1082':
      return 'Unable to retrieve merchant list';
    case '1083':
      return 'Merchant found successfully';
    case '1084':
      return 'Your user is suspended, please contact admin';
    case '1085':
      return "You don't have rights to suspend/unsuspend a user";
    case '1086':
      return 'Please provide email or phone of the user to be suspended/unsuspended';
    case '1087':
      return 'db error in suspending/unsuspending user';
    case '1088':
      return 'User successfully suspended';
    case '1089':
      return 'Unable to logout';
    case '1090':
      return 'logout is successful';
    case '1091':
      return 'User successfully un-suspended';
    case '1092':
      return 'Distributor name can not be null';
    case '1093':
      return 'DB error in saving distributor';
    case '1094':
      return 'Distributor saved successfully';
    case '1095':
      return 'Promotion successfully added';
    case '1096':
      return 'Promotion deleted';
    case '1097':
      return 'Get all promotion data with pagination';
    case '1098':
      return 'Get filter products by brand , model and year ';
    case '1099':
      return "You are trying to add admin, you don't have priviliges to do that, failure.";
    case '1100':
      return 'Please login as admin first to register an admin';
    case '1101':
      return "Phone numbers or email can't be duplicated";
    case '1102':
      return 'Admin is not allowed to do this operation';
    case '1103':
      return "Admin can't be registered from mobile";
    case '1104':
      return "You don't have rights to add/update a product";
    case '1105':
      return 'Please specify the email of the parent of this product';
    case '1106':
      return 'Only admin can add/remove/update a category';
    case '1107':
      return 'Name in an array is required';
    case '1108':
      return "This merchant/user doesn't exists, please register a user first";
    case '1109':
      return 'Only admin and merchant himself can edit this info';
    case '1110':
      return 'Please provide a merchant email to update';
    case '1111':
      return 'Locations must be defined';
    case '1112':
      return 'assets must be defined';
    case '1113':
      return 'atleast one location must be given with main set';
    case '1114':
      return 'atleast one asset must be given with main set';
    case '1115':
      return 'only distributor and admin can edit a distributor';
    case '1116':
      return 'Please provide distributor email to update';
    case '1117':
      return 'The detailed user is unavailable, failure';
    case '1118':
      return "The user you are defining doesn't have a location, please update user and try again";
    case '1119':
      return 'Please specify a slug to update product';
    case '1120':
      return 'Unable to update product';
    case '1121':
      return 'Product successfully updated';
    case '1122':
      return "The product you are trying to edit doesn't belog to the user you provided";
    case '1123':
      return "You don't have rights to do this operation";
    case '1124':
      return 'The product you are trying to suspend is already suspended';
    case '1125':
      return 'Unable to suspend this product';
    case '1126':
      return 'Product successfully suspended';
    case '1127':
      return 'Theproduct is already unsuspended';
    case '1128':
      return 'Unable to unsuspend this product';
    case '1129':
      return 'Product successfully unsuspended';
    case '1130':
      return 'Unable to get suspended products';
    case '1131':
      return 'Product list successful';
    case '1132':
      return 'Banner successfully added';
    case '1133':
      return 'Removed banner';
    case '1134':
      return 'Get main banner';
    case '1135':
      return 'Get all banners';
    case '1136':
      return 'Banner not found';
    case '1137':
      return 'Banner updated';
    case '1138':
      return 'Main not found';
    case '1139':
      return 'un approved product list successful';
    case '1140':
      return 'Unable to get unapproved products';
    case '1141':
      return 'The product is already approved';
    case '1142':
      return 'DB error is approving product';
    case '1143':
      return 'Product approved successfully';
    case '1144':
      return 'Can add product for active user only';
    case '1145':
      return 'The user requesting products not found, please login first';
    case '1146':
      return 'Only merchant can request approval from distributor';
    case '1147':
      return 'You are trying to get suspended merchant';
    case '1148':
      return "The distributor you are trying to request approval doesn't exists";
    case '1149':
      return 'The distributor you are trying to request approval is suspended';
    case '1150':
      return 'The distributor you are trying to request approval is not activated';
    case '1151':
      return 'You already requested this distributor, wait for the reply';
    case '1152':
      return 'Unable to save approval request';
    case '1153':
      return 'Approval request successful, please wait for distributor reply';
    case '1154':
      return 'Please specify a distributor';
    case '1155':
      return 'db error reading request';
    case '1156':
      return 'The distributor you are getting is suspended';
    case '1157':
      return 'Only distributor can perform this action';
    case '1158':
      return 'unable to get pending list';
    case '1159':
      return 'Pending requests list successful';
    case '1160':
      return 'merchant is required to perform this operation';
    case '1161':
      return "Can't block the merchant";
    case '1162':
      return 'Merchant already blocked';
    case '1163':
      return 'Merchant successfully blocked';
    case '1164':
      return 'Merchant is not blocked';
    case '1165':
      return "Can't unblock the merchant";
    case '1166':
      return 'Merchant successfully unblocked, you can see the request in new requests now';
    case '1167':
      return "Can't approve the merchant";
    case '1168':
      return 'Merchant is not activated';
    case '1169':
      return 'Merchant successfully approved';
    case '1170':
      return "You don't have priviliges to see this product";
    case '1171':
      return 'Product details successful';
    case '1172':
      return 'The product no longer exists';
    case '1173':
      return 'No search phrase given';
    case '1174':
      return 'Sorry no product found';
    case '1175':
      return 'Search results attached';
    case '1176':
      return 'Admin needs to provide a user email to perform this action';
    case '1177':
      return 'List attached';
    case '1178':
      return 'User favorite products';
    case '1179':
      return 'User favorite Merchants';
    case '1180':
      return 'Brand not added';
    case '1181':
      return 'Brand successfully added';
    case '1182':
      return 'Brand not removed';
    case '1183':
      return 'Brand removed';
    case '1184':
      return 'DB error while getting brands';
    case '1185':
      return 'Get all Brands with pagination';
    case '1186':
      return 'Only admin can add/remove/update a brand';
    case '1187':
      return 'productBrand not found';
    case '1188':
      return 'One or all of supportedCarBrands not found';
    case '1189':
      return 'Brand id is missing, please add ids for all brands.';
    case '1190':
      return 'Brands in supported brands list must not be duplicated';
    case '1191':
      return "Brand already existed, can't add, please use edit for this purpose";
    case '1192':
      return 'Unable to save brand';
    case '1193':
      return 'Brand Updated';
    case '1194':
      return 'Asset not found';
    case '1195':
      return 'Product successfully deleted';
    case '1196':
      return 'Product not Saved to deletedProducts';
    case '1197':
      return 'Product not Saved to deletedProductSummary';
    case '1198':
      return 'Product not removed';
    case '1199':
      return 'ProductSummary not removed';
    case '1200':
      return 'Brand not saved to deletedBrands';
    case '1201':
      return 'User not saved to deletedUsers';
    case '1202':
      return 'Buyer not saved to deletedBuyers';
    case '1203':
      return 'Buyer not removed';
    case '1204':
      return 'User not removed';
    case '1205':
      return 'User successfully deleted!';
    case '1206':
      return 'Merchant not saved to deletedMerchants';
    case '1207':
      return 'Merchant not removed';
    case '1208':
      return 'Merchant successfully deleted!';
    case '1209':
      return 'MerchantSummary not saved to deletedMerchantsummary';
    case '1210':
      return 'MerchantSummary not  removed';
    case '1211':
      return 'MerchantSummary not  found';
    case '1212':
      return 'Distributer not saved to deletedDistributers';
    case '1213':
      return 'DistributerSummary not found';
    case '1214':
      return 'DistributerSummary not saved to deletedDistributerSummary';
    case '1215':
      return 'Distributer not found';
    case '1216':
      return 'Distributer not removed';
    case '1217':
      return 'DistributerSummary not removed';
    case '1218':
      return 'Distributer successfully deleted!';
    case '1219':
      return 'You are not allowed to do this operation';
    case '1220':
      return 'Already add to fav products';
    case '1221':
      return 'Fav Product not saved';
    case '1222':
      return 'Already add to fav merchant';
    case '1223':
      return 'Fav merchant not saved';
    case '1224':
      return 'Already add to fav distributor';
    case '1225':
      return 'Fav distributor not saved';
    case '1226':
      return 'FavProduct not found';
    case '1227':
      return 'Product not removed';
    case '1228':
      return 'fav product not saved in deletedFavProducts';
    case '1229':
      return 'Fav Merchant product  not found';
    case '1230':
      return 'Merchant product not removed';
    case '1231':
      return 'fav Merchant product not saved in deletedFavProducts';
    case '1232':
      return 'Fav Merchant found';
    case '1233':
      return 'Merchant not removed';
    case '1234':
      return 'fav Merchant not saved in deletedFavProducts';
    case '1235':
      return 'Fav distributor not found';
    case '1236':
      return 'distributor not removed';
    case '1237':
      return 'fav distributor not saved in deletedFavProducts';
    case '1238':
      return "You don't have rights to add/update a Promotion";
    case '1239':
      return 'Promotion not added';
    case '1240':
      return 'Promotion not found';
    case '1241':
      return 'Promotion not saved to deletedPromotions';
    case '1242':
      return 'The promotion you are trying to suspend is already suspended';
    case '1243':
      return 'Promotion successfully suspended';
    case '1244':
      return 'Promotion successfully unsuspended';
    case '1245':
      return 'The promotion you are trying to unsuspend is already unsuspended';
    case '1246':
      return 'ExpiryDate successfully changed in Promotions';
    case '1247':
      return 'Get all Suspended Promotions';
    case '1248':
      return 'Only admin can add/remove/update Setting';
    case '1249':
      return 'Only admin can add official brand';
    case '1250':
      return 'sequence number not allowed';
    case '1251':
      return "Can't add brand without brand name";
    case '1252':
      return "can't add brand without a single asset";
    case '1253':
      return 'Unable to save official brand';
    case '1254':
      return 'Brand saved but sequence not assigned';
    case '1255':
      return 'Only admin can add/remove/update Banners';
    case '1256':
      return 'Official brand added successfully';
    case '1257':
      return 'Old sequence not provided';
    case '1258':
      return 'new sequence not provided';
    case '1259':
      return 'Sequence changed successfully';
    case '1260':
      return 'Brand with this sequence not found';
    case '1261':
      return 'Unable to change sequence';
    case '1262':
      return 'Banner not saved';
    case '1263':
      return "Can't get sequence count if you are not admin";
    case '1264':
      return 'Unable to get total officail brands';
    case '1265':
      return 'Highest official brand is';
    case '1266':
      return 'Banner not saved in deletedBanners';
    case '1267':
      return 'official brands unable to retrieve';
    case '1268':
      return 'Official brands retrieved successfully';
    case '1269':
      return 'The Banner you are trying to suspend is already suspended';
    case '1270':
      return 'The Banner you are trying to unsuspend is already unsuspended';
    case '1271':
      return 'Banner successfully suspended';
    case '1272':
      return 'Banner successfully unsuspended';
    case '1273':
      return 'Brand product not found';
    case '1274':
      return 'Brand products successful';
    case '1275':
      return 'Setting not saved';
    case '1276':
      return 'Setting  successfully  saved';
    case '1277':
      return 'Setting not found';
    case '1278':
      return ' Setting not updated ';
    case '1279':
      return 'Setting successfully updated ';
    case '1280':
      return 'error while getting settings';
    case '1281':
      return ' Get all Settings with pagination ';
    case '1282':
      return 'error while getting promotions';
    case '1283':
      return "Buyer and merchant can't get the items more than page size";
    case '1284':
      return 'Please specify a brandname to get the products for brand';
    case '1285':
      return 'Brand for product not found';
    case '1286':
      return 'Brands products successfull';
    case '1287':
      return "Can't get featured products sequence if you are not admin";
    case '1288':
      return 'unable to get featured products';
    case '1289':
      return 'highest featured product successful';
    case '1290':
      return 'Only admin can add featured products';
    case '1291':
      return 'You are not allowed to access featured/latest products';
    case '1292':
      return 'Only admin is allowed to get all the featured products in one go';
    case '1293':
      return 'Only admin is allowed to remove feature products';
    case '1294':
      return 'Only admin is allowed to change sequence of featured product';
    case '1295':
      return 'Only admin can view all the product list';
    case '1296':
      return 'Please provide product slug';
    case '1297':
      return 'Product you are trying to add/remove feature is already featured/not featured';
    case '1298':
      return 'Unable to retrieve maximum value, adding/removing feature failed';
    case '1299':
      return 'Feature product saving/removing failed';
    case '1300':
      return 'Product successfully added/removed to featured';
    case '1301':
      return 'Feature products not found';
    case '1302':
      return 'Feature products list successful';
    case '1303':
      return 'Product is not featured';
    case '1304':
      return 'Featured Products not found';
    case '1305':
      return 'Featured product listings successful';
    case '1306':
      return 'Only admin can add featured category';
    case '1307':
      return 'Error in categories db read';
    case '1308':
      return 'Categories listings successful';
    case '1309':
      return 'Category slug not found';
    case '1310':
      return 'Category not found';
    case '1311':
      return 'Category already featured';
    case '1312':
      return 'Category added to featured already';
    case '1313':
      return 'Category not featured';
    case '1314':
      return 'latest products not found';
    case '1315':
      return 'latest products successful';
    case '1316':
      return 'Promotion successfully updated';
    case '1317':
      return "Can't get more than page size items.";
    case '1318':
      return 'Only admin can refresh trending products';
    case '1319':
      return "Can't update trending products";
    case '1320':
      return 'Trending products updated successfully';
    case '1321':
      return 'Unable to add item in cart at this moment';
    case '1322':
      return "A product can't have flash sale and price negotiation both";
    case '1323':
      return 'Unable to conect dd for settings';
    case '1324':
      return 'Setting already exists in db, please use update to change settings';
    case '1325':
      return 'Maximum allowed negotiation is out of range';
    case '1326':
      return 'You need to specify the maximum negotiation if this product is negotiable';
    case '1327':
      return 'Product is not negotiable';
    case '1328':
      return "Distributor and admin can't negotiate price/ cancel negotiation";
    case '1329':
      return 'Price negotiation not allowed between same level users (i.e. merchant, buyer)';
    case '1330':
      return 'Negotiation price out of range';
    case '1331':
      return 'Unable to perform negotiation';
    case '1332':
      return 'A negotiation for this item from you is already underway, please wait the response';
    case '1333':
      return 'This negotiation is already passed';
    case '1334':
      return 'Maximum allowed negotiation is out of range';
    case '1335':
      return 'unable to changeSequence';
    case '1336':
      return 'DeletedProductBrand saved';
    case '1337':
      return 'productbrand Deleted';
    case '1338':
      return 'productBrand Soft deleted';
    case '1339':
      return 'Please provide productbrand id';
    case '1340':
      return 'productBrand not updated';
    case '1341':
      return 'Settings not found';
    case '1342':
      return 'Unable to save negotiation';
    case '1343':
      return 'Price negotiation sent to seller, please wait for reply.';
    case '1344':
      return 'Negotiation saved but unable to create item';
    case '1345':
      return 'NegotiationValidity time not properly formatted';
    case '1346':
      return 'Negotiation is already invalid';
    case '1347':
      return "Buyer/Admin can't respond negotiation";
    case '1348':
      return 'Negotiation id not found';
    case '1349':
      return "Negotiation you are trying to access doesn't exists";
    case '1350':
      return 'Sorry the product is either suspended or not approved';
    case '1351':
      return 'You are not allowed to respond to this offer';
    case '1352':
      return 'You already responded to this offer, please wait for buyer';
    case '1353':
      return "You can't decrease the percentage after agreeing to a higher percentage";
    case '1354':
      return 'Error responding negotiation';
    case '1355':
      return 'Negotiation response successful';
    case '1356':
      return "You can't increase the percentage from your previous negotiation";
    case '1357':
      return 'A negotiation with better percentage is already approved, please use that.';
    case '1358':
      return 'Time for this negotiation is already passed';
    case '1359':
      return 'You are trying to approve negotiation percent more requested.';
    case '1360':
      return 'Qunatity is must required for negotiation';
    case '1361':
      return 'Quantity is out of range/stock';
    case '1362':
      return 'You are not authorised to cancel this negotiation';
    case '1363':
      return 'This negotiation is already cancelled by buyer';
    case '1364':
      return 'Unable to log negotiation';
    case '1365':
      return 'Negotiation successfully cancelled';
    case '1366':
      return 'Please wait ------ minutes before cancelling again.';
    case '1367':
      return "Negotiation doesn't exist";
    case '1368':
      return "Negotiation items doesn't exists";
    case '1369':
      return 'Negotiation status successful';
    case '1370':
      return "You don't have priviliges to do this operation";
    case '1371':
      return 'Unable to get negotiation list';
    case '1372':
      return 'Negotiation list successful';
    case '1373':
      return 'To get negotiation list ';
    case '1374':
      return 'Need to give negotiationSlug in order to get list';
    case '1375':
      return 'A new price negotiation is initiated';
    case '1376':
      return 'Unable to send notification, please try the procedure again';
    case '1377':
      return 'Price negotiation is cancelled by buyer';
    case '1378':
      return 'Price negotiation response received';
    case '1379':
      return 'Rengotiated proce received';
    case '1380':
      return "You don't have rights to add/update a banner";
    case '1381':
      return 'Merchant already added a banner';
    case '1382':
      return 'Distributor not found';
    case '1383':
      return 'Distributor already added a banner';
    case '1384':
      return 'Please specify a slug to remove banner';
    case '1385':
      return 'Please specify a merchantSlug to getbanner';
    case '1386':
      return 'Please specify a slug to updatebanner';
    case '1387':
      return 'Please login to add item to cart';
    case '1388':
      return 'DenyList is missing for admin';
    case '1389':
      return 'sellerRole is missing for admin';
    case '1390':
      return 'Please specify a slug to update promotion';
    case '1391':
      return 'Unable to update promotion';
    case '1392':
      return 'promotion updated';
    case '1393':
      return 'no result found for promotions';
    case '1394':
      return 'get promotions for admin ';
    case '1395':
      return 'Slug for settings is required';
    case '1396':
      return "distributor and admin can't have cart";
    case '1397':
      return 'User successfully found';
    case '1398':
      return 'admin address is not supported right now';
    case '1399':
      return 'Address field is not provided';
    case '1400':
      return 'City field is required';
    case '1401':
      return '"State field is required	"';
    case '1402':
      return '"Zipcode field is required ';
    case '1403':
      return 'Please specify old default location';
    case '1404':
      return 'Please specify new default location';
    case '1405':
      return 'Old default location is not found, please add location first';
    case '1406':
      return 'locationNew not found. please add locationNew first';
    case '1407':
      return 'locationOld main not found. ';
    case '1408':
      return 'locationNew.main not found';
    case '1409':
      return 'oldDefault is not equal to newDefault';
    case '1410':
      return 'DefaultAddress has successfully changed ';
    case '1411':
      return 'Default location not found';
    case '1412':
      return 'default location success ';
    case '1413':
      return 'currency is required ';
    case '1414':
      return 'price not found';
    case '1415':
      return '';
    case '1416':
      return 'quantity is required ';
    case '1417':
      return 'singleCartEntry is must be greater than the required quantity';
    case '1418':
      return 'mainCat not found in product';
    case '1419':
      return 'cart not saved';
    case '1420':
      return 'Cart added Successfully';
    case '1421':
      return 'CartItem not found';
    case '1422':
      return 'Quantity must not be less then equal to  zero';
    case '1423':
      return 'totalItems must not greater then equal to cartItemsLimit';
    case '1424':
      return 'Cart not found';
    case '1425':
      return 'totalItems must not less then equal to zaro';
    case '1426':
      return 'Get cartItem Success message';
    case '1427':
      return 'CartItem not found';
    case '1428':
      return '';
    case '1429':
      return 'User location length must not equal to zero';
    case '1430':
      return 'newLocation not found. please add newLocation first';
    case '1431':
      return 'DeliveryAddress not saved';
    case '1432':
      return 'DeliveryAddress changed successfully ';
    case '1433':
      return 'totalItems must not less then equal to zero';
    case '1434':
      return 'itemId is required';
    case '1435':
      return 'item not found';
    case '1436':
      return 'Qunatity decrease successfully';
    case '1437':
      return 'Product must not be suspended or deleted';
    case '1438':
      return 'newQuantity must not be less then equal to zero';
    case '1439':
      return 'required quantity and item quantity must not be equal';
    case '1440':
      return 'itemId not found';
    case '1441':
      return 'Total quantity must be less then required quantity';
    case '1442':
      return 'CartItem removed successfully';
    case '1443':
      return 'promoCode is required ';
    case '1444':
      return 'Please login as admin first';
    case '1445':
      return 'Email is required';
    case '1446':
      return 'CategoryCommissionsaved successfully ';
    case '1447':
      return 'CategoryCommission not found';
    case '1448':
      return 'percentage is required';
    case '1449':
      return '';
    case '1450':
      return 'only admin is allowed to added tax and insurance Expiry';
    case '1451':
      return 'TaxExpiry not updated in cars';
    case '1452':
      return 'TaxExpiry updated in cars';
    case '1453':
      return 'insuranceExpiry not updated in cars';
    case '1454':
      return 'insuranceExpiry updated in cars';
    case '1455':
      return 'DrivingLicense not added ';
    case '1456':
      return 'DrivingLicense added successfully ';
    case '1457':
      return 'DrivingLicense not updated';
    case '1458':
      return 'DrivingLicense updated successfully ';
    case '1459':
      return 'no DrivingLicense found for this user';
    case '1460':
      return 'get All DrivingLicense ';
    case '1461':
      return 'carId required for update';
    case '1462':
      return 'drivingLicense slug is required for update';
    case '1463':
      return 'you need to login from buyer';
    case '1464':
      return 'Time is missing or invalid';
    case '1465':
      return 'Banner slot time is not valid';
    case '1466':
      return 'flashSale max time is not valid';
    case '1467':
      return 'flashSale min time is not valid';
    case '1468':
      return 'banner start time and end time success';
    case '1469':
      return 'Change flashSaleDifference time (flashSaleDifference must be greater then maxFlashSlotTime)';
    case '1470':
      return 'Not enough default banners in the system, minimum 2 required, one for main page one for merchant/distributor';
    case '1471':
      return 'Default banners already complete please use update fucntion';
    case '1472':
      return "Can't have parent with time, confusion on server end";
    case '1473':
      return "Can't have parent and default, confusion on server end";
    case '1474':
      return 'default banner for this type is already available';
    case '1475':
      return 'Banner db error';
    case '1476':
      return "Banner time is less than current time, can't process request";
    case '1477':
      return 'maximum items for this banner is already achieved';
    case '1478':
      return 'Distributor or merchant banner can only have one item at this moment';
    case '1479':
      return "You don't have rights to add default banner";
    case '1480':
      return 'error reading banners';
    case '1481':
      return 'Merchant id or product id link is must for banner item';
    case '1482':
      return 'Please specify the type of user banner is going to show in role field';
    case '1483':
      return 'Invalid role to show the item to.';
    case '1484':
      return 'Admin can only add personal default banner.';
    case '1485':
      return 'Unable to create banner';
    case '1486':
      return 'email is required while adding item from admin';
    case '1487':
      return 'The product is not found to be linked in banner';
    case '1488':
      return 'The owner of this banner is not the owner of product to be linked';
    case '1489':
      return 'The user is not found for this merchant/distributor link';
    case '1490':
      return 'Src is missing in the schema';
    case '1491':
      return 'Adding default item successful';
    case '1492':
      return 'Banner slots greater than settings';
    case '1493':
      return 'request format error';
    case '1494':
      return "total forward banner slots can't be more than 60";
    case '1495':
      return "total skip time can't be more than 60";
    case '1496':
      return "Can't add banner for this much advance days";
    case '1497':
      return 'DB error in banner';
    case '1498':
      return 'Slots data successful';
    case '1499':
      return 'Valid reason is must in rejecting an item';
    case '1500':
      return 'Reason is not valid';
    case '1501':
      return 'Reason must be atleast 20 characters';
    case '1502':
      return 'A banner item id is must for updating item';
    case '1503':
      return 'Banner item not found for update';
    case '1504':
      return 'Associated banner is not found for this item';
    case '1505':
      return 'item is already approved';
    case '1506':
      return 'Banner slot already passed';
    case '1507':
      return 'Banner item updated successfully';
    case '1508':
      return 'item is already denied';
    case '1509':
      return "Can't approve denied item, please add again";
    case '1510':
      return 'banner items successful';
    case '1511':
      return "denied and approved both can't be true at same time";
    case '1512':
      return 'banner item id is required';
    case '1513':
      return 'banners successful';
    case '1514':
      return 'Admin and buyer needs to specify the email to get banner';
    case '1515':
      return 'Item is already approved, please use suspend for the item';
    case '1516':
      return 'Item not found for this slug';
    case '1517':
      return "Can't suspend default banner";
    case '1518':
      return "Can't suspend last default banner item";
    case '1519':
      return "A denied banner can't be suspended";
    case '1520':
      return "You already have allowed quantity in this slot, you can't have more than allowed quantity in one slot";
    case '1521':
      return 'Banner item is not suspended';
    case '1522':
      return 'Unsuspending banner successful';
    case '1523':
      return "Admin has suspended this banner, please request admin to unsuspend it, you can't so it.";
    case '1524':
      return "Whole banner is suspended can't unsuspend item, please contact admin";
    case '1525':
      return 'Please specify the type of user flash sale is going to show in role field';
    case '1526':
      return 'email is required while adding flash sale from admin';
    case '1527':
      return 'A time is required to add flash sale';
    case '1528':
      return 'DB error in flash sale';
    case '1529':
      return "Can't create flash sale with out flash sale discount";
    case '1530':
      return 'Flash sale discount is not proper';
    case '1531':
      return "Can't create flash sale with out product slug";
    case '1532':
      return 'Product for this flash sale is unavaible, suspended or waiting approval';
    case '1533':
      return 'The product is not associated with this email/user';
    case '1534':
      return 'Item successfully added';
    case '1535':
      return "This item is already added in this flash sale, can't add an item twice in same time slot";
    case '1536':
      return 'Flash sale for current slot is not available';
    case '1537':
      return "Can't add flash sale after allowed period of time";
    case '1538':
      return 'A flash sale item is must for the update';
    case '1539':
      return 'Flash item not available for update';
    case '1540':
      return 'Flash sale alreaddy passed';
    case '1541':
      return 'Flash sale updation successful';
    case '1542':
      return "Distributor and admin can't start Chat";
    case '1543':
      return 'chat not allowed between same level users (i.e. merchant, buyer)';
    case '1544':
      return 'Message not found (please type a message)';
    case '1545':
      return 'unable to save chat';
    case '1546':
      return 'Chat saved but unable to create chat item';
    case '1547':
      return 'chat sent to seller, please wait for reply.';
    case '1548':
      return 'A chat from you is already underway, please wait the response';
    case '1549':
      return 'Maximum allowed chat Message is out of range';
    case '1550':
      return 'Rengotiated Chat';
    case '1551':
      return 'Error responding chat';
    case '1552':
      return 'Unable to perform Chat';
    case '1553':
      return "Buyer/Admin can't respond Chat";
    case '1554':
      return 'Chat id not found';
    case '1555':
      return "Chat you are trying to access doesn't exists";
    case '1556':
      return 'You are not allowed to respond to this offer';
    case '1557':
      return 'Time for this chat is already passed';
    case '1558':
      return 'Chat response received';
    case '1559':
      return 'Time for this chat is already passed';
    case '1660':
      return 'Chat list successful';
    case '1561':
      return 'Flash Sale already suspended';
    case '1562':
      return "Flash sale is less than current time, can't process request";
    case '1563':
      return 'Flash Sale already unsuspended';
    case '1564':
      return 'Flash sale successful';
    case '1565':
      return 'email is required while adding/editing flash sale from admin';
    case '1566':
      return 'A slug is required';
    case '1567':
      return "Whole flash sale is suspended, can't unsuspend item";
    case '1568':
      return 'One of parameter, searchName or searchEmail is required';
    case '1569':
      return "Both search name and SearchEmail can't be true";
    case '1570':
      return "Can't change product, please suspend this item and add new item";
    case '1571':
      return 'malfunction searchPhrase';
    case '1572':
      return 'No public holidays given';
    case '1573':
      return 'Invalid day in public holiday';
    case '1574':
      return "Holidays can't be more than 365 in one fiscal year";
    case '1575':
      return 'Public holidays should be given in an array';
    case '1576':
      return 'Please create a schedules entry before adding a product for installation';
    case '1577':
      return 'Failed updating all the seller schedules with public holidays';
    case '1578':
      return 'You are not allowed to perform this operation';
    case '1579':
      return 'Skip days should be provided in an array';
    case '1580':
      return 'Skip hours should be provided in an array';
    case '1581':
      return 'Number of requests per hour should be a number';
    case '1582':
      return 'Skip days should be provided';
    case '1583':
      return 'Skip hours should be provided';
    case '1584':
      return 'Request per hour is missing';
    case '1585':
      return 'Skip days are not proper';
    case '1586':
      return 'Holidays should be added/ updated through add/delete holiday function';
    case '1587':
      return 'Skip hours are not proper';
    case '1588':
      return 'Number of requests are not proper';
    case '1589':
      return 'Requests per hour is greater than max request allowed by maila please contact admin';
    case '1590':
      return 'Schedule successful';
    case '1591':
      return 'Time to is required';
    case '1592':
      return 'Time from is required';
    case '1593':
      return 'Time to is misformed';
    case '1594':
      return 'Time from is misformed';
    case '1595':
      return 'Time from must be greater than time to';
    case '1596':
      return "Time from can't be greater than time to";
    case '1597':
      return 'A schedule for this user is already in place, please use update to modify the record';
    case '1598':
      return 'Schedule not found for this user';
    case '1599':
      return 'Holidays must be an array';
    case '1600':
      return 'Holidays is missing';
    case '1601':
      return 'Please specify atleast one holiday';
    case '1602':
      return 'A product slug is must for getting schedules';
    case '1603':
      return 'Booking is not available for getting schedule';
    case '1604':
      return "The booking state is completed, scheduled or complained, can't book again unless problem is resolved";
    case '1605':
      return 'Schedules for this merchant is not available';
    case '1606':
      return 'timeStart is not valid';
    case '1607':
      return "You can't book schedules in advance for this time, please contact admin";
    case '1608':
      return 'Error reading schedule';
    case '1609':
      return 'Schedules entries successful';
    case '1610':
      return 'A schedules booking id is required to do scheduling';
    case '1611':
      return 'Time start is missing';
    case '1612':
      return 'Time end is missing';
    case '1613':
      return 'A state is required to view schedule';
    case '1614':
      return 'This time is already passed please choose another time for schedule';
    case '1615':
      return 'Schedules time is already passed, please use complain function';
    case '1616':
      return 'You are trying to book a schedule which is not present';
    case '1617':
      return 'The slot you have choosed is already taken, please choose another one';
    case '1618':
      return 'Schedule successful';
    case '1619':
      return 'Purchasing cart successful';
    case '1620':
      return "Can't cancel this schedule. The schedule is not set";
    case '1621':
      return 'Not enough slots for this schedule';
    case '1622':
      return "You can't cancel this booking";
    case '1623':
      return "Can't cancel requests max out";
    case '1624':
      return 'Slot is not one hour difference, please use proper values';
    case '1625':
      return 'Your booking has been scheduled successfully';
    case '1626':
      return 'The booking has been cancelled please reschedule';
    case '1627':
      return 'Role is required for the banner';
    case '1628':
      return 'Sller schedule successful';
    case '1629':
      return 'email for seller is required in the favorite tasks';
    case '1630':
      return 'You can only mark complete when state is scheduled';
    case '1631':
      return 'You need to upload signed document before completing a schedule';
    case '1632':
      return 'Schedule is marked completed successfully';
    case '1633':
      return 'You are trying to update another merchant schedule';
    case '1634':
      return 'A signed document for this schedule already exists';
    case '1635':
      return 'The signature has been saved/updated';
    case '1636':
      return 'Booking status to update the signature should be completed or scheduled';
    case '1637':
      return "A signed document to update doesn't exists";
    case '1638':
      return 'Src for signed document is required';
    case '1639':
      return "Booking is not yet started can't mark completed or upload document";
    case '1640':
      return 'One or more of the holidays is already a holiday';
    case '1641':
      return 'One or more of the holiday is public holiday';
    case '1642':
      return 'one of item value is not correct';
    case '1643':
      return 'Holiday is supposed to be a number';
    case '1644':
      return 'There are already booking on this day, do you want to cancel all those bookings?';
    case '1645':
      return 'Adding holiday successful';
    case '1646':
      return 'Booking is shifted due to emergency, please rebook';
    case '1647':
      return 'Adding holiday siccessful';
    case '1648':
      return 'You are trying to delete non holiday';
    case '1649':
      return "You can't delete public holiday";
    case '1650':
      return 'Holiday successfully deleted';
    case '1651':
      return "Holiday already passed, can't delete now";
    case '1652':
      return 'One or more item courier is not choosen, please choose the courier first before purchasing';
    case '1653':
      return 'A valid promo discount is required';
    case '1654':
      return 'Promo code is not provided';
    case '1655':
      return 'Promo code already existed please provide a new one';
    case '1656':
      return 'Courier code is not provided';
    case '1657':
      return 'Courier name is not provided';
    case '1658':
      return 'asset for courier is not provided';
    case '1659':
      return 'add courier successful';
    case '1660':
      return 'An array is required for adding multiple couriers';
    case '1661':
      return 'Courier not found to be removed/updated';
    case '1662':
      return 'Courier successfully removed/updated';
    case '1663':
      return 'Courier service list successful';
    case '1664':
      return 'Province id not provided';
    case '1665':
      return 'Province name not provided';
    case '1666':
      return 'Saving province successful';
    case '1667':
      return 'An array is required for adding multiple provinces';
    case '1668':
      return 'Province not found to be removed/updated';
    case '1669':
      return 'Province successfully removed/updated';
    case '1670':
      return 'Getting all provinces successful';
    case '1671':
      return 'Courier codes is required to get limited couriers';
    case '1672':
      return 'A city id is must';
    case '1673':
      return 'Postal code is must to add city';
    case '1674':
      return 'City name is must to add city';
    case '1675':
      return 'City type is must to add city, get city types for more info';
    case '1676':
      return 'Invalid province to add city';
    case '1677':
      return 'City saved successfully';
    case '1678':
      return 'An array is required for adding multiple cities';
    case '1679':
      return 'One or more provinces not found';
    case '1680':
      return 'Cities saving successful';
    case '1681':
      return 'City types successful';
    case '1682':
      return 'Getting city successful';
    case '1683':
      return 'Province removed with all the associated cities and sub districts';
    case '1684':
      return 'City not present with this city id';
    case '1685':
      return 'City removed successfully and all its subdistricts';
    case '1686':
      return 'City updated successfully';
    case '1687':
      return 'Province name for each item is must in adding multiple cities';
    case '1688':
      return 'Sub district type is required';
    case '1689':
      return 'Sub district name is required';
    case '1690':
      return 'City to add sub district is not found';
    case '1691':
      return 'Sub district saved correctly';
    case '1692':
      return 'One or more city missing for sub districts';
    case '1693':
      return 'City id is required to get sub district';
    case '1694':
      return 'Getting subdistrict successful';
    case '1695':
      return 'Sub districtId is required';
    case '1696':
      return 'Sub district remove/ update successful';
    case '1697':
      return 'Sub district to remove/ update not found in db';
    case '1698':
      return 'Location slug needs to be provided to remove the item';
    case '1699':
      return 'Location not found to be removed';
    case '1700':
      return 'Atleast one address is required in the system, please add more to remove this address';
    case '1701':
      return 'City Id is required field in adding address';
    case '1702':
      return 'Province Id is required field in adding address';
    case '1703':
      return 'Subdistrict not found to add address';
    case '1704':
      return "Cities doesn't match for this subdistrict";
    case '1705':
      return "Province doesn't match for this city";
    case '1706':
      return 'City not found.';
    case '1707':
      return 'Product weight is required and should be valid number greater than 0 in grams';
    case '1708':
      return 'Courier is required in an array with minimum value of 1';
    case '1709':
      return 'Shipping from is required and should be a valid address';
    case '1710':
      return 'Shipping from address is required';
    case '1711':
      return 'Shipping from postal code is required';
    case '1712':
      return 'Shipping from city id is required';
    case '1713':
      return 'Shipping from province id is required';
    case '1714':
      return 'Address not proper in update';
    case '1715':
      return 'One or more courier providers are not supported';
    case '1716':
      return 'Error reading raja ongkir api';
    case '1717':
      return 'Courier list successful';
    case '1718':
      return 'Please provide a courier code';
    case '1719':
      return 'Please provide a service';
    case '1720':
      return "This item requires installation, can't choose courier for this item";
    case '1721':
      return 'There is no courier service, please getCourierPrice before performing this operation';
    case '1722':
      return 'The choosen courier provider is not supported';
    case '1723':
      return 'Serive cost is not provided';
    case '1724':
      return 'Courier successfully choosen';
    case '1725':
      return 'A valid status is required to get order history';
    case '1726':
      return 'Order History successful';
    case '1727':
      return 'Need order id';
    case '1728':
      return 'Order not found';
    case '1729':
      return 'Order successful';
    case '1730':
      return 'Way bill not provided';
    case '1731':
      return "Way bill provided doesn't seem to be valid";
    case '1732':
      return 'You are not allowed to see this order';
    case '1733':
      return 'Way bill is already added, please use update way bill';
    case '1734':
      return 'Way Bill saving successful';
    case '1735':
      return "Already delivered items can't be changed";
    case '1736':
      return "Both waybills are same, can't update";
    case '1737':
      return 'The order is still new, wait for seller to update';
    case '1738':
      return 'Order is already completed';
    case '1739':
      return 'Name of account is must in adding bank details';
    case '1740':
      return 'Bank code is must in adding bank details';
    case '1741':
      return 'Account number is must in adding bank details';
    case '1742':
      return 'Bank name is must in adding bank details';
    case '1743':
      return 'Bank address is must in adding bank details';
    case '1744':
      return 'Bank pnr is must in adding bank details';
    case '1745':
      return 'Saving/ Updating bank details successful';
    case '1746':
      return "The bank account doesn't exists";
    case '1747':
      return 'In order to get someone else details an email is required in body';
    case '1748':
      return 'Getting bank address successful';
    case '1749':
      return 'Start time is must for get commission';
    case '1750':
      return 'End time is must for get commission';
    case '1751':
      return 'getting commission success';
    case '1752':
      return 'Number records is not proper';
    case '1753':
      return 'Number records need to less than 100';
    case '1754':
      return 'Payment holding days need to be more than 1';
    case '1755':
      return 'Reading service failed, please try again in couple of minutes';
    case '1756':
      return 'A valid state parameter is required';
    case '1757':
      return 'Bank details are required before checkout wallet, please provide banck details first';
    case '1758':
      return 'Wallet updated sucessfully';
    case '1759':
      return 'Wallet success';
    case '1760':
      return 'Please choose some valid transactions as array to move to wallet';
    case '1761':
      return 'One or more transactions given are not available for transferring, please try again';
    case '1762':
      return 'Money successfully transferred to wallet please check your wallet';
    case '1763':
      return 'No available earning found';
    case '1764':
      return "Sorry no wallet found you can't checkout right now";
    case '1765':
      return 'The wallet is already in checkout, please cancel the checkout before you can checkout again';
    case '1766':
      return 'A valid checkout amount is required for this operation';
    case '1767':
      return 'You choose to checkout more than amount available in your account';
    case '1768':
      return "You are transferring negative amount to wallet that is already in checkout approval, can't process right now";
    case '1769':
      return 'Checkout request successful';
    case '1770':
      return "There is no checkout request for wallet can't cancel checkout";
    case '1771':
      return 'Getting pending wallet successful';
    case '1772':
      return "For timebeing can't change name of account";
    case '1773':
      return 'Wallet id is required to approve checkout';
    case '1774':
      return 'An email is also required to approve checkout';
    case '1775':
      return 'The email provided is not correct for the wallet';
    case '1776':
      return 'A bank receipt is required for this transaction';
    case '1777':
      return 'Valid transfer amount is must for this transaction';
    case '1778':
      return 'The wallet owner is not requesting the checkout';
    case '1779':
      return 'The transferred amount is more than requested checkout';
    case '1780':
      return 'Checkout approved successfully';
    case '1781':
      return 'A transaction id is required to get wallet history with transaction';
    case '1782':
      return 'Sorry the history not found';
    case '1783':
      return 'History successful';
    case '1784':
      return 'Transferred amount is more than wallet amount';
    case '1785':
      return 'A valid maxAllowedUserSignatures is required';
    case '1786':
      return 'You already have maximum signatures please delete some to add more';
    case '1787':
      return 'A source is required for adding signature';
    case '1788':
      return 'Users signature successfully added';
    case '1789':
      return 'User signature id is must to delete signatures';
    case '1790':
      return "You can't delete the last signature";
    case '1791':
      return 'signature index not properly provided';
    case '1792':
      return 'TransactionId is required for this operation';
    case '1793':
      return 'Transaction not found';
    case '1794':
      return 'Getting transaction successfull';
    case '1795':
      return "The transaction complain is already rejected, can't complain again";
    case '1796':
      return 'The transaction is already refunded';
    case '1797':
      return 'There is already a complain for this transaction, please reply to that one';
    case '1798':
      return 'The allowed time to complain for this transaction has passed';
    case '1799':
      return 'A complain topic is required for launching complain';
    case '1800':
      return 'A complain message is also required for launching complain';
    case '1801':
      return "You are not owner of this transaction, hence can't make complain";
    case '1802':
      return 'A complain has been made about your product';
    case '1803':
      return 'Complain successfully launched';
    case '1804':
      return 'Complain is not found for response';
    case '1805':
      return "You can't reply/resolve to a resolved complain";
    case '1806':
      return 'You need to add your signatures before launching a complain';
    case '1807':
      return 'A reply has been published for you complain';
    case '1808':
      return 'Replying to complain successful';
    case '1809':
      return 'Merchant is allowed to reply a complain only once';
    case '1810':
      return 'An admin has rejected your complain';
    case '1811':
      return 'Rejecting complain has been successful';
    case '1812':
      return 'The transaction is already refunded';
    case '1813':
      return 'A refund for the complain has been added to your wallet';
    case '1814':
      return 'Refund successful';
    case '1815':
      return 'Getting complain listings successful';
    case '1816':
      return 'Complain id is required';
    case '1817':
      return 'Posting to payment gateway failed';
    case '1818':
      return 'Payment gateway successful';
    case '1819':
      return "The cart is already waiting payment gateway response, you can't add/remove item";
    case '1820':
      return 'Error in reading response from midtrans';
    case '1821':
      return 'Midtrans link successful';
    case '1822':
      return "Can't apply promo to an empty cart";
    case '1823':
      return 'There is already one promo applied to cart, please remove that one first';
    case '1824':
      return "The promotion you want to apply doesn't exist or is expired";
    case '1825':
      return 'The promotion you are trying to apply is already applied by you';
    case '1826':
      return 'This promotion is not available for you';
    case '1827':
      return 'Deny list is required in an array';
    case '1828':
      return 'None of the merchants you are buying from can participate in this promotion';
    case '1829':
      return 'Applying promo sucessful';
    case '1830':
      return 'The promo you are trying to remove is not present';
    case '1831':
      return 'Removing promo successful';
    case '1832':
      return 'No user found to send general notification';
    case '1833':
      return 'A message is required for general notification';
    case '1834':
      return 'notification successfully sent';
    case '1835':
      return 'Notification count successful';
    case '1836':
      return 'Notification list successful';
    case '1837':
      return 'A notification id is required to do this operation';
    case '1838':
      return 'Notification not found';
    case '1839':
      return 'Notification already seen';
    case '1840':
      return 'marking notification/ notifications seen successful';
    case '1841':
      return 'unable to remove item';
    case '1842':
      return 'Removing item successful';
    case '1843':
      return 'One product specification is required';
    case '1844':
      return 'Please provide an avatar for updating';
    case '1845':
      return 'Avatar updated successfully';
    case '1846':
      return "You can't add a variant with zero quantity";
    case '1847':
      return 'Colors must be added in order to continue';
    case '1848':
      return 'Each color needs to have all the specifications in it.';
    case '1849':
      return 'Too many specifications, try to break the product.';
    case '1850':
      return 'Too many colors in one product, try to break the product';
    case '1851':
      return 'Must need id in the specs';
    case '1852':
      return 'you can not add spec in color with quantity zero, rather delete it';
    case '1853':
      return 'the variant id in this color is not valid';
    case '1854':
      return 'Appointment time is time needed for each appointment, should be a number';
    case '1855':
      return 'Appointment time should be a positive integer';
    case '1856':
      return 'Appointment time is more than working hour';
    case '1857':
      return 'Only one color is required in service';
    case '1858':
      return 'Only one specification is required in service';
    case '1859':
      return "Service doesn't requires a weight";
    case '1860':
      return "Service doesn't requires a stock";
    case '1861':
      return "Service doesn't support multi currency at this moment";
    case '1862':
      return 'Every variant need to have one price object inside';
    case '1863':
      return 'Product is added but failed at adding intellisense';
    case '1864':
      return 'Login successful';
    case '1865':
      return 'User name is available';
    case '1866':
      return 'DB error in checking user';
    case '1867':
      return 'Phone is available';
    case '1868':
      return 'Phone Number is taken';
    case '1869':
      return 'Email is taken';
    case '1870':
      return 'Courrier is not required for service';
    case '1871':
      return 'The specification id for new and old service is different';
    case '1872':
      return 'The old color and new color ids are different';
    case '1873':
      return 'Spec quantity is not required in services';
    case '1874':
      return 'Merchant image is required';
    case '1875':
      return "Per color assets can't exceed 10 items";
    case '1876':
      return 'Every product details summary is must';
    case '1877':
      return 'Summary exceeds more than 500 characters';
    case '1878':
      return "Summary can't be less than 25 characters";
    case '1879':
      return 'Every language must have details';
    case '1880':
      return "Details can't be more than 5000 characters";
    case '1881':
      return "Details length can't be less than 500 characters";
    case '1882':
      return 'Product cart saving failed';
    case '1883':
      return 'Product details saving failed';
    case '1884':
      return 'Fixed service need to have fixed service settings';
    case '1885':
      return "Fixed service quantity can't be zero";
    case '1886':
      return 'Fixed service time is must';
    case '1887':
      return "Scheduled time can't be less than 24 hours from now";
    case '1888':
      return 'Error in removing product cart';
    case '1889':
      return 'Error in removing product details';
    case '1890':
      return 'Error in reading product cart item';
    case '1891':
      return 'Error in reading product detail item';
    case '1892':
      return 'You are trying to convert service to product which is not possible';
    case '1893':
      return 'You are trying to convert product to service which is not possible';
    case '1894':
      return 'Product limited details successful';
    case '1895':
      return 'A specification id is must for cart';
    case '1896':
      return 'A color id is must for cart';
    case '1897':
      return 'The specification id mentioned is incorrect';
    case '1898':
      return 'The color slug mentioned is not present in the product';
    case '1899':
      return "Product requires a quantity, this item specification don't have quantiy";
    case '1900':
      return 'Icon is not present in the color';
    case '1901':
      return 'Assets is must in icon';
    case '1902':
      return 'Atleast one asset is required';
    case '1903':
      return 'This service quantity is already booked';
    case '1904':
      return 'Db error in new product';
    case '1905':
      return 'Not enough items to continue to checkout';
    case '1906':
      return 'No selected products/services';
    case '1907':
      return 'Verification code is not present in the request';
    case '1908':
      return 'Verfication code size needs to be six characters';
    case '1909':
      return 'Old verification code is not equal to saved verification code';
    case '1910':
      return 'Verification code added';
    case '1911':
      return 'Old verification code not provided';
    case '1912':
      return 'Old verification code is empty';
    case '1913':
      return 'Verification code already added, try calling change verification code';
    case '1914':
      return 'Verification code changed';
    case '1915':
      return 'Old verification code is equal to new verification code';
    case '1916':
      return 'There is a service in the cart you need to add verification code before checking out';
    case '1917':
      return 'There is service in the cart you have to select amount type first.';
    case '1918':
      return "Cart don't have any service to select amount type";
    case '1919':
      return 'Cart minimum amount is zero';
    case '1920':
      return 'Cart minimum amount is already selected, call change amount type';
    case '1921':
      return 'Amount type is not given in the body';
    case '1922':
      return 'Amount type is not selected, please use select amount type';
    case '1923':
      return 'Amount type is not a valid option';
    case '1924':
      return 'Amount selected successfully';
    case '1925':
      return "Cart has some checked out items in it, you can't check out again";
    case '1926':
      return 'There is product worth more than 100,000 in cart, Cash on delivery is not supported for product over 100,000. You have to pay the amount over 100,000. Please select amount type first.';
    case '1927':
      return 'Moving to checkout for some items failed';
    case '1928':
      return 'Cart saving failed';
    case '1929':
      return 'Unable to move cart to checkout';
    case '1930':
      return 'Cart checkout successful';
    case '1931':
      return 'This color is already added please choose different color';
    case '1932':
      return 'Product quantity is not enough for this operation, decrease the quantity and try again';
    case '1933':
      return 'Service added to cart successfully';
    case '1934':
      return 'Fixed service added to cart successfully';
    case '1935':
      return 'Error in getting the merchant for this cart';
    case '1936':
      return 'error in getting merchant cart items';
    case '1937':
      return 'Single item select must provide the product slug';
    case '1938':
      return 'Item not found in the cart';
    case '1939':
      return 'Item is already selected';
    case '1940':
      return 'Merchant for this item is not avaiable';
    case '1941':
      return 'Atleast one shipping service is required';
    case '1942':
      return 'Shipping cost not available for the selected weight';
    case '1943':
      return 'Item selected successfully';
    case '1944':
      return 'Product weight is not appropriate for shipping';
    case '1945':
      return 'Merchant Email is required for the selection of products';
    case '1946':
      return 'No items matched for this merchant in cart';
    case '1947':
      return 'Cart updation failed';
    case '1948':
      return 'Selecting merchant items successful';
    case '1949':
      return 'Selecting cart products successful';
    case '1950':
      return 'Unselecting cart products successful';
    case '1951':
      return 'Selecting cart services successful';
    case '1952':
      return 'Unselecting cart local services successful';
    case '1953':
      return 'Selecting cart all items successful';
    case '1954':
      return 'Unselecting cart local item successful';
    case '1955':
      return 'Checkout is not possible for this cart';
    case '1956':
      return 'Selection of checkout option is required';
    case '1957':
      return 'Unselecting cart item successful';
    case '1958':
      return "Can't decrease quantity, its already 1, please try to remove item";
    case '1959':
      return 'The product you want to remove is not in the merchant items';
    case '1960':
      return 'Quanity needs to be greater than zero';
    case '1961':
      return 'Cart item removed successfully';
    case '1962':
      return 'Merchant carts deleting failed';
    case '1963':
      return 'Items count is zero';
    case '1964':
      return 'MerchantChecked out items failed';
    case '1965':
      return 'Error saving checkout';
    case '1966':
      return 'Checkout successful';
    case '1967':
      return 'Cart updation failed';
    case '1968':
      return 'Removing checkout failed because of merchant checked out items';
    case '1969':
      return 'Removing checked out items failed';
    case '1970':
      return 'Cancel checkout successful';
    case '1971':
      return 'Only admin can add supported payment methods';
    case '1972':
      return 'name is must in payment methods';
    case '1973':
      return 'Description is required in payment methods';
    case '1974':
      return 'Amount type supported is required in payment methods';
    case '1975':
      return 'Proper asset is required in payment methods';
    case '1976':
      return 'Supported payment methods saving failed';
    case '1977':
      return 'Supported payment methods saving successful';
    case '1978':
      return 'No supported payment methods found';
    case '1979':
      return 'Payment methods successful';
    case '1980':
      return 'A valid payment code is required';
    case '1981':
      return "Payment code length can't be more than 4 characters";
    case '1982':
      return 'Spaces is not allowed in the code';
    case '1983':
      return 'Digit is not allowed in the code';
    case '1984':
      return 'Payment method deleted successfully';
    case '1985':
      return 'Select payment code';
    case '1986':
      return 'This payment code is not supported';
    case '1987':
      return 'Verification code must be six digits long';
    case '1988':
      return 'There are no checked out items at this moment';
    case '1989':
      return 'Checked out merchants are not found';
    case '1990':
      return 'No merchant checkedout items are found';
    case '1991':
      return 'Wallet finding error';
    case '1992':
      return "Can't select minimum payment where products total is over 100,000";
    case '1993':
      return 'Only full payment is supported for cart selected items';
    case '1994':
      return 'No need to select amount type';
    case '1995':
      return 'Both full payment and minimum amount is supported';
    case '1996':
      return "Can't show amount as no items selected";
    case '1997':
      return "Can't select amount type as cart total is zero";
    case '1998':
      return 'Service unselected successfully';
    case '1999':
      return 'Shipping costs removing failed';
    case '2000':
      return 'Failed to remove devices login detail';
    case '2001':
      return 'Notification Status is required, Must be in 1 (FCM) or 0 (EXPO) form';
    case '2002':
      return 'Notification Key is required';
    case '2003':
      return 'Authentication Succeeded, New User from Social Login';
    case '2004':
      return 'Already User, Authentication Succeeded';
    case '2005':
      return 'Device id not matched …Unable to login';
    case '2006':
      return 'Error in update Login Activity';
    case '2007':
      return 'Error in find Facebook and Google Login Schema';
    case '2008':
      return 'Password is required for Facebook and Google Login';
    case '2009':
      return 'Phone is required for Facebook and Google Login';
    case '2010':
      return 'Country Code is required for Facebook and Google Login';
    case '2011':
      return 'User is not in Facebook and Google Login';
    case '2012':
      return 'User is create via Facebook and Google Login';
    case '2013':
      return 'Error in create user via Facebook and Google Login';
    case '2014':
      return 'Email must required for Facebook and Google Login';
    case '2015':
      return 'Error in remove user from Facebook and Google Login Schema';
    case '2016':
      return "Admin can't topup wallet";
    case '2017':
      return 'Only admin can do topup of manual wallets';
    case '2018':
      return 'This amount is not supported in wallet checkout';
    case '2019':
      return 'Amount text is not given';
    case '2020':
      return "Amount text doesn't match with amount";
    case '2021':
      return 'Email is required for the account you want to do manual topup';
    case '2022':
      return 'A receipt is required for manual topup';
    case '2023':
      return 'Manual update successful';
    case '2024':
      return 'Manual history listing success';
    case '2025':
      return 'Success getting total amount';
    case '2026':
      return "Can't check more than your wallet amount";
    case '2027':
      return 'Minimum topup is PKR 100';
    case '2028':
      return 'Total checkout with amount less than PKR 100 is not supported with Debit card';
    case '2029':
      return 'The transaction is not in pending status';
    case '2030':
      return "Your payment is already waiting bank response, can't cancel";
    case '2031':
      return 'A valid orderId is must for retrieving order';
    case '2032':
      return 'Payment gateway shutdown unexpectedly, We are still waiting for there response';
    case '2033':
      return 'Transaction retrieving and updating success';
    case '2034':
      return 'Saving payment gateway transaction failed';
    case '2035':
      return 'Payment gateway session creating error';
    case '2036':
      return 'The payment status with your bank is unknown, your items will remain intact please contact your bank, You can check status again, your items and transaction will remain intact.';
    case '2037':
      return 'The payment status with your bank is pending, your items will remain intact please contact your bank, You can check status again, your items and transaction will remain intact.';
    case '2038':
      return 'You are cancelling order which is pending bank status, make sure you cancel bank transaction also, pindal will not take any responsibility in this case for the payment';
    case '2039':
      return 'This payment is not checked out with bank';
    case '2040':
      return 'Your bank order id is not available';
    case '2041':
      return 'The transaction is either processed or not available';
    case '2042':
      return "Transaction can't be updated at this moment, please try again later";
    case '2043':
      return 'Transaction is approved but failed in adding to your wallet, please contact the admin for assistance';
    case '2044':
      return 'Unable to find your checkout session';
    case '2045':
      return 'This payment method is not supported';
    case '2046':
      return 'The trasaction from bank failed, your checkouts will remain intact for couple of hours, Please solve the issue with bank and try again';
    case '2047':
      return 'This payment gateway transaction is not available';
    case '2048':
      return 'You are checking too soon, please wait 15 minutes before you can check again';
    case '2049':
      return 'Transaction updating failed';
    case '2050':
      return 'Courier Service item id is required';
    case '2051':
      return 'Shipping cost updation failed';
    case '2052':
      return 'Shipping item not found';
    case '2053':
      return 'Shipping updation successful';
    case '2054':
      return 'Newweight finding failed';
    case '2055':
      return 'Your wallet has some problem please contact the callcenter for further queries';
    case '2056':
      return 'Please tell if wallet is selected or not for payment';
    case '2057':
      return "Wallet can't be used at this moment";
    case '2058':
      return 'Payment method selected is not supported';
    case '2059':
      return 'Sorry COD is not supported, please choose another payment method';
    case '2060':
      return "We are waiting for gateway payment approval, can't checkout.";
    case '2061':
      return 'Sorry your wallet is either checkout or not enough cash to do this operation';
    case '2062':
      return 'Transactions length is zero';
    case '2063':
      return "Transactions and order history / scheduled history length doesn't match";
    case '2064':
      return 'Notifications array is must for the multiple notifications';
    case '2065':
      return 'Notifications length is already zero';
    case '2066':
      return 'Insertion of transactions failed';
    case '2067':
      return 'Error in checking out';
    case '2068':
      return 'payment successful, please visit order history for products and schedules history for making schedules or checking fixed schedules';
    case '2069':
      return 'Order purchase successful, There is service in the order which is paid by Cash on Delivery, Only Services paid upfront are refundable';
    case '2070':
      return 'Payment gateway must have fedx percent';
    case '2071':
      return 'Per transaction fees needs to be provided';
    case '2072':
      return 'If bank are charging you more than 10 percent, they are robbing you';
    case '2073':
      return 'fedex percent need to be provided';
    case '2074':
      return 'If bank is charging you more than 20 percent fedex, they are robbing you';
    case '2075':
      return 'If per transaction fee is more than 25 please contact other bank';
    case '2076':
      return 'No appropriate item to checkout';
    case '2077':
      return 'There is no wallet with this id';
    case '2078':
      return 'Wallet is already in checkout state';
    case '2079':
      return 'Wallet amount is not enough';
    case '2080':
      return 'Wallet is already being used for payment please wait for process to finish';
    case '2081':
      return 'Wallet saving error';
    case '2082':
      return 'Multiple locations have been disabled for merchant';
    case '2083':
      return 'Update the merchant address from update_address api';
    case '2084':
      return 'Email array is required for merchant whose addresses have been inserted to TCS';
    case '2085':
      return 'Merchant updation failed';
    case '2086':
      return 'Merchant updation of address successful';
    case '2087':
      return 'Merchant address update success';
    case '2088':
      return 'Getting merchant list unsuccessful';
    case '2089':
      return 'Merchant listing successful';
    case '2090':
      return 'No merchant found to update';
    case '2091':
      return 'Waiting bank to approve payment';
    case '2092':
      return 'Bank session creating failed';
    case '2093':
      return 'Your payment is pending through bank, please contact the bank for more details';
    case '2094':
      return 'Failed at checkout';
    case '2095':
      return 'Amount in wallet checkout is must';
    case '2096':
      return 'Amount is not a number';
    case '2097':
      return "Amount can't be zero or negative";
    case '2098':
      return 'Wallet amounts for checkout are successful';
    case '2099':
      return 'Wallet payment listing success';
    case '2100':
      return 'Wallet topup success';
    case '2101':
      return 'Consecutive messsages limit exceed. Wait for the reply.';
    case '2102':
      return 'Unable to get chat list';
    case '2103':
      return 'Chat list successful';
    case '2104':
      return 'Unable to get users (buyer and merchant)';
    case '2105':
      return 'Unable to perform chat';
    case '2106':
      return 'Unable to save message';
    case '2107':
      return 'Message sent successfully, please wait for reply.';
    case '2108':
      return 'Merchant can not initiate chat';
    case '2109':
      return 'Please enter some message';
    case '2110':
      return 'Invalid number of users, chat should be between buyer and merchant.';
    case '2111':
      return 'Chat Id not provided';
    case '2112':
      return 'Unable to get chat item list';
    case '2113':
      return 'Chat item list successful';
    case '2114':
      return 'Email Buyer not provided';
    case '2115':
      return 'Otp not  found';
    case '2116':
      return 'Otp sending failed, please try again.';
    case '2117':
      return 'Your maximum attempts limit exceeded, try again after a while.';
    case '2118':
      return 'Both phone number and email is required for 2FA';
    case '2119':
      return 'Otp saving failed';
    case '2120':
      return 'Product id is must';
    case '2121':
      return 'Merchant email is required for chat listing';
    case '2122':
      return 'Buyer Email is required';
    case '2123':
      return "Reading chat failed, the chat doesn't exist";
    case '2124':
      return 'Chat item successful';
    case '2125':
      return 'lat and lng is required';
    case '2126':
      return "Locations can't be more than 10";
    case '2127':
      return 'Lat, lng getting failed';
    case '2128':
      return 'Complain is not refundable, but the complain has been resolved.';
    case '2129':
      return 'Ask user to insert verification code before marking this to complete';
    case '2130':
      return 'Buyer not found';
    case '2131':
      return "Verfication codes doesn't match";
    case '2132':
      return "Fixed Service can't be scheduled";
    case '2133':
      return "Fixed Service can't be canceled";
    case '2134':
      return "Service can't be removed after time is passed";
    case '2135':
      return 'This order is already scheduled, or completed or cancelled, can\t remove';
    case '2136':
      return 'Fixed services can only be cancelled more than 24 hours before the event starts';
    case '2137':
      return 'Adding amount to wallet failed';
    case '2138':
      return 'Service is cancelled and refunded successfully';
    case '2139':
      return 'Service is cancelled but this service is not refundable';
    case '2140':
      return "Merchant can't cancel service";
    case '2141':
      return "You can't cancel this order";
    case '2142':
      return 'Booking saving failed';
    case '2143':
      return "Order can't be cancelled";
    case '2144':
      return 'Unable to approve payment';
    case '2145':
      return 'You are not authorised to get merchants list';
    case '2146':
      return 'Undelivered Merchant listing successful';
    case '2147':
      return 'We need merchant email from the admin to start shipping order';
    case '2148':
      return 'Product is cancelled and refunded successfully';
    case '2149':
      return 'Product is cancelled but this service is not refundable';
    case '2150':
      return 'Old bank details saved successfully';
    case '2151':
      return 'Type is required for retrieveing wallet';
    case '2152':
      return 'Access Token expired';
    case '2153':
      return "User can't start delivering order";
    case '2154':
      return 'You have to give merchant email to place order for him';
    case '2155':
      return 'Order id needs to be given to place order';
    case '2156':
      return 'Reading order failed';
    case '2157':
      return 'Order is in delivery';
    case '2158':
      return 'Order ids are required in the list';
    case '2159':
      return "Orderids list size can't be zero";
    case '2160':
      return 'Placing multiple orders success';
    case '2161':
      return 'The transaction state is not new';
    case '2162':
      return 'Nothing to update';
    case '2163':
      return 'Only admin can get untrusted merchants';
    case '2164':
      return 'Untrusted merchants listing successful';
    case '2165':
      return 'Only admin can make a merchant trusted';
    case '2166':
      return 'Merchant trusted successful';
    case '2167':
      return 'Email is necessary for making merchant trusted';
    case '2168':
      return 'lat is required in location';
    case '2169':
      return 'lng is required in location';
    case '2170':
      return 'Merchant not found to make trusted';
    case '2171':
      return 'Merchant email is required in merchat variable';
    case '2172':
      return 'Reports can only be obtained by admin';
    case '2173':
      return 'User is required in placing an order';
    case '2174':
      return 'TCS error in posting';
    case '2175':
      return 'Order history updation failed';
    case '2176':
      return 'Transaction status failed';
    case '2177':
      return 'There is no body in response';
    case '2178':
      return 'Updated the status of order with printing';
    case '2179':
      return 'Orders array is required in updating the printing status';
    case '2180':
      return 'One or more order has not buyer in it';
    case '2181':
      return 'One or more order does not have merchant in it';
    case '2182':
      return "One or more order doesn't have orderId in it";
    case '2183':
      return 'Consignment numbers array is required to finnish the transaction';
    case '2184':
      return 'Failed finding orders';
    case '2185':
      return 'Transactions updation failed';
    case '2186':
      return 'OrderHistory saving failed';
    case '2187':
      return 'Cash on delivery successful';
    case '2188':
      return 'No cash on delivery orders found';
    case '2189':
      return 'In shipping orders listing db error';
    case '2190':
      return 'In shipping orders listing success';
    case '2191':
      return "Can't read transactions from db";
    case '2192':
      return 'Reading transactions success';
    case '2193':
      return "You can't create complain when the status is new";
    case '2194':
      return "You haven't purchased this product, can't add review";

    default:
      return 'Not in given constant';
  }
};
